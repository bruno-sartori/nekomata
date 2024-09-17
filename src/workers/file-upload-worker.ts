const worker = function() {
  self.onmessage = function(e) {
    const file = e.data.file;
    const index = e.data.index;

    uploadChunk(file, index).then(() => {
      self.postMessage({ type: 'done', index });
    });
  }
  
  const uploadChunk = (file: File, index: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/upload-chunk', true);
  
      xhr.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
          let uploadPercent = e.loaded / e.total;
          uploadPercent = (uploadPercent * 100);
  
          self.postMessage({ type: 'uploadPercent', value: uploadPercent, index });
        }
      }, false);
  
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(true);
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      };
  
      xhr.onerror = function () {
        reject(new Error('Upload failed due to network error'));
      };
  
      xhr.send(formData);
    });
  }
};

const codeToStr = worker.toString();
const mainCode = codeToStr.substring(codeToStr.indexOf('{') + 1, codeToStr.lastIndexOf('}'));
const blob = new Blob([mainCode], { type: 'application/javascript' });
const workerBlob = URL.createObjectURL(blob);

export default workerBlob;
