const worker = function () {
  self.onmessage = function (e) {
    const file = e.data.file;
    const index = e.data.index;

    handleFileUpload(file, index);
  }

  const kilobytes = (value: number): number => value * 1024;
  const megabytes = (value: number): number => kilobytes(value) * 1024;
  // const gigabytes = (value: number): number => megabytes(value) * 1024;
  //const terabytes = (value: number): number => gigabytes(value) * 1024;

  const handleFileUpload = (file: File, index: number) => {

    const chunkSize = megabytes(5);
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const uploadNextChunk = async () => {
      if (navigator.onLine) {
        if (end <= file.size) {
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("chunkNumber", chunkNumber.toString());
          formData.append("totalChunks", totalChunks.toString());
          formData.append("originalname", file.name);
          const url = "http://localhost:3000/upload/chunk";
  
          try {
            const response = await fetch(url, { method: "POST", body: formData });
            const data = await response.json();
            const status = `Chunk ${chunkNumber + 1}/${totalChunks} uploaded successfully`;
            const progress = Number((chunkNumber + 1) * chunkProgress);
            
            self.postMessage({ type: 'uploadStatus', value: progress, status: { status, data },  index });
            
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            uploadNextChunk();
          } catch (error) {
            if (!navigator.onLine) {
              uploadNextChunk();
            }
            self.postMessage({ type: 'error', index, error });
          }
        } else {
          self.postMessage({ type: 'done', index });
        }
      } else {
        self.postMessage({ type: 'error', index, error: 'NO_INTERNET_CONNECTION' });
        setInterval(() => {
          if (navigator.onLine) {
            uploadNextChunk();
          }
        }, 5000);
      }
    };

    uploadNextChunk();
  };
};

const codeToStr = worker.toString();
const mainCode = codeToStr.substring(codeToStr.indexOf('{') + 1, codeToStr.lastIndexOf('}'));
const blob = new Blob([mainCode], { type: 'application/javascript' });
const workerBlob = URL.createObjectURL(blob);

export default workerBlob;
