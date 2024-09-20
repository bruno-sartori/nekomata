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
    let end = 0;

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
    const chunkSize = megabytes(5);
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;
    const { hashes, chunks } = await prepareChunks(file, chunkSize);

    if (!pending) {
      try {
        const response = await fetch('http://localhost:3000/upload/init', { 
          method: "POST", 
          body: JSON.stringify({
            fileName,
            totalChunks,
            fileHash,
            hashes
          }), 
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        fileId = data.file.id;
      } catch (error: any) {
        self.postMessage({ type: 'error', index, error: error.message });
        throw new Error();
      }
    }

    if (pending) {
      fileId = pending.id;
      chunkNumber = pending.chunkNumber + 1;
      start = chunkNumber * chunkSize;
      end = start + chunkSize;
    }

    const uploadNextChunk = async () => {
      if (navigator.onLine) {
        if (chunkNumber < totalChunks) {
          const chunk = file.slice(start, end);
          const chunkHash = await calculateChunkHash(chunk);
          const formData = new FormData();
          formData.append("file", chunk);
          formData.append('fileId', fileId);
          formData.append("chunkNumber", chunkNumber.toString());
          formData.append("totalChunks", totalChunks.toString());
          formData.append("originalname", fileName);
          formData.append("chunkHash", chunkHash);

          const url = "http://localhost:3000/upload/chunk";
  
          try {
            const response = await fetch(url, { 
              method: "POST", 
              body: formData, 
              headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status !== 200) {
              throw new Error('UPLOAD_ERROR');
            }

            const data = await response.json();
            const status = `Chunk ${chunkNumber + 1}/${totalChunks} uploaded successfully`;
            const progress = Number((chunkNumber + 1) * chunkProgress);
            
            self.postMessage({ type: 'uploadStatus', value: progress, status: { status, data },  index });
            
            chunkNumber++;
            start = end;
            end = start + chunkSize;

            if (end > file.size) {
              end = file.size;
            }

            await uploadNextChunk();
          } catch (error) {
            if (!navigator.onLine) {
              await uploadNextChunk();
            }
            self.postMessage({ type: 'error', index, error });
          }
        } else {
          self.postMessage({ type: 'done', index });
        }
      } else {
        self.postMessage({ type: 'error', index, error: 'NO_INTERNET_CONNECTION' });
        setInterval(async () => {
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
