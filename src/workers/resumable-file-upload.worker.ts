type PendingFile = {
  id: string;
  fileName: string;
  status: 'pending' | 'success' | 'error';
  chunkNumber: number;
  totalChunks: number;
}

const worker = function () {
  self.onmessage = function (e) {
    const file = e.data.file;
    const index = e.data.index;
    const token = e.data.token;
    const pending = e.data.pending;

    handleFileUpload(file, token, index, pending);
  }

  async function calculateChunkHash(chunk: Blob): Promise<string> {
    const arrayBuffer = await chunk.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const prepareChunks = async (file: File, chunkSize: number): Promise<{ hashes: string[], chunks: Blob[] }> => {
    const chunks: Blob[] = [];
    const hashes: string[] = [];
    const totalChunks = Math.ceil(file.size / chunkSize);
    let chunkNumber = 0;
    let start = 0;
    let end = chunkSize;

    const generateNextHash = async () => {
      if (chunkNumber < totalChunks) {
        try {
          const chunk = file.slice(start, end);
          chunks.push(chunk);
          const chunkHash = await calculateChunkHash(chunk);
          hashes.push(chunkHash);

          chunkNumber++;
          start = end;
          end = start + chunkSize;

          if (end > file.size) {
            end = file.size;
          }

          await generateNextHash();
        } catch (error) {
          throw error;
        }
      } else {
        return;
      }
    };

    await generateNextHash();

    return { hashes, chunks };
  };
  
  const kilobytes = (value: number): number => value * 1024;
  const megabytes = (value: number): number => kilobytes(value) * 1024;
  // const gigabytes = (value: number): number => megabytes(value) * 1024;
  //const terabytes = (value: number): number => gigabytes(value) * 1024;

  const handleFileUpload = async (file: File, token: string, index: number, pending?: PendingFile) => {
    let fileId: string = '';
    const fileName = file.name;
    const fileHash = await calculateChunkHash(file);
    const chunkSize = megabytes(3);
    const { hashes, chunks } = await prepareChunks(file, chunkSize);
    const totalChunks = chunks.length;
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    const failedChunks: Set<number> = new Set();
    const resentFailedChunksThatSucceed: Set<number> = new Set();

    if (!pending) {
      try {
        const response = await fetch('http://localhost:3000/upload/init', { 
          method: "POST", 
          body: JSON.stringify({
            fileName,
            totalChunks,
            fileHash,
            hashes,
            size: file.size
          }), 
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        fileId = data.file.id;
      } catch (error: any) {
        self.postMessage({ type: 'error', index, error: error.message });
        throw new Error();
      }
    } else {
      fileId = pending.id;
      chunkNumber = pending.chunkNumber + 1;
    }

    const sendChunk = async (chunkNumberToUpload: number) => {
      const chunk = chunks[chunkNumberToUpload];
      const chunkHash = await calculateChunkHash(chunk);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append('fileId', fileId);
      formData.append("chunkNumber", chunkNumberToUpload.toString());
      formData.append("totalChunks", totalChunks.toString());
      formData.append("originalname", fileName);
      formData.append("chunkHash", chunkHash);
      formData.append("size", chunk.size.toString());
  
      const url = "http://localhost:3000/upload/chunk";
  
      const response = await fetch(url, { 
        method: "POST", 
        body: formData, 
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status !== 200) {
        throw new Error('UPLOAD_ERROR');
      }

      const data = await response.json();
      const status = `Chunk ${chunkNumberToUpload}/${totalChunks - 1} uploaded successfully`;
      const progress = Number((chunkNumberToUpload + 1) * chunkProgress);
      
      self.postMessage({ type: 'uploadStatus', value: progress, status: { status, data }, index });
    };

    const uploadNextChunk = async () => {
      if (navigator.onLine) {
        if (failedChunks.size > 0) {
          // Se houver chunks falhados, tentar reenvia-los
          self.postMessage({ type: 'retryingFailedChunks', failedChunks, index });

          for (const failedChunk of failedChunks) {
            try {
              await sendChunk(failedChunk);
              resentFailedChunksThatSucceed.add(failedChunk);
            } catch (error) {
              self.postMessage({ type: 'error', index, error: `Failed to upload chunk ${failedChunk}` });
            }
          }

          for (const chunk of resentFailedChunksThatSucceed) {
            failedChunks.delete(chunk);
          }

          await uploadNextChunk();
        } else if (chunkNumber < totalChunks) {
          try {
            await sendChunk(chunkNumber);
            chunkNumber++;
          } catch (error) {
            self.postMessage({ type: 'error', index, error: `Failed to upload chunk ${chunkNumber}` });
            failedChunks.add(chunkNumber);    
          }
          
          await uploadNextChunk();  // Chama recursivamente para o próximo chunk
  
        } else {
          // Quando todos os chunks forem enviados com sucesso
          self.postMessage({ type: 'done', index });
        }
      } else {
        self.postMessage({ type: 'error', index, error: 'NO_INTERNET_CONNECTION' });
        setTimeout(async () => {
          if (navigator.onLine) {
            await uploadNextChunk();
          }
        }, 5000);
      }
    };

    await uploadNextChunk();
  };
};

const codeToStr = worker.toString();
const mainCode = codeToStr.substring(codeToStr.indexOf('{') + 1, codeToStr.lastIndexOf('}'));
const blob = new Blob([mainCode], { type: 'application/javascript' });
const workerBlob = URL.createObjectURL(blob);

export default workerBlob;
