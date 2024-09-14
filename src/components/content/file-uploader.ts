import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fileUploaderStyle } from '../../styles/file-uploader.style';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext } from '../../@types/contexts';
import UpdateContentContextEvent from '../../events/update-content-context';
import './uploaded-file';
import fileUploadWorkerBlob from '../../workers/file-upload-worker';

@customElement('file-uploader')
export class FileUploader extends LitElement {
  static override styles = fileUploaderStyle;

  @consume({ context: contentContext, subscribe: true })
  @state()
  private contentCtx: ContentContext = initialContentContext;

  @state()
  uploadDate?: Date = undefined;

  constructor() {
    super();
  }

  override render() {
    return html`
      <div class="file-uploader">
        <h1 class="file-uploader__title text">Upload files</h1>
        <p class="file-uploader__description text">Add your documents here. You can add up to 10 files.</p>
        <div 
          class="file-uploader__picker" 
          @dragenter="${this.onDragEnter}" 
          @dragover="${this.onDragOver}"
          @drop="${this.onDrop}" 
          @click="${this.onClick}"
        >
          <input type="file" id="file" multiple class="file-uploader__file" accept="video/*" @change="${this.onSelectFile}" hidden>
          <h2 class="file-uploader__picker__title text">Drag & drop files here or choose files</h2>
          <p class="file-uploader__picker__description text">1 GB max file size</p>
        </div>
        <h2 class="title-secondary text">Uploaded Files</h2>
        <div class="file-uploader__uploaded-files">
          ${this.contentCtx.files.map((file, index) => html`
            <uploaded-file .file=${file} .index=${index} .uploadDate=${this.uploadDate}></uploaded-file>
          `)}
        </div>
      </div>
    `;
  }

  private onClick() {
    this.shadowRoot?.getElementById('file')?.click();
  }

  private onDragEnter(event: DragEvent) {
    const outputEl = document.getElementById('output');

    if (outputEl) {
      outputEl.textContent = '';
    }

    event.stopPropagation();
    event.preventDefault();
  }

  private onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  private onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const dt = event.dataTransfer;
    
    const files = Array.from(dt?.files as FileList);

    if (files) {
      this.uploadDate = new Date();
      this.dispatchEvent(new UpdateContentContextEvent({ files, progress: Array(files.length).fill(0) }));
      this.uploadFiles(files);
    }
  }

  private onSelectFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const files = Array.from((event.target as HTMLInputElement).files as FileList);

    if (files) {
      this.uploadDate = new Date();
      this.dispatchEvent(new UpdateContentContextEvent({ files, progress: Array(files.length).fill(0) }));
      this.uploadFiles(files);
    }
  }

  private uploadFiles(files: File[]) {
    let maxWorkers = navigator.hardwareConcurrency || 4;
    const totalWorkers = files.length;
    let index = 0;
    const start = (new Date).getTime();

    const runWorker = (worker: Worker) => {
      worker.onmessage = (event) => {
        console.log(event);
        if (event.data.type === 'done') {
          console.log('worker.onmessage i = ' + event.data + '\n');
  
          if (index < totalWorkers) {
            runWorker(worker);
          } else {
            if (--maxWorkers === 0) {
              console.log((new Date).getTime() - start);
            }
  
            worker.terminate();
          }
        } else {
          const progress = this.contentCtx.progress;
          progress[event.data.index] = event.data.value;
          this.dispatchEvent(new UpdateContentContextEvent({ progress }));
        }
      };
      
      worker.postMessage({ file: files[index], index });
      index++;
    }

    for (var i = 0; i < maxWorkers && i < files.length; i++) {
      runWorker(new Worker(fileUploadWorkerBlob));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'file-uploader': FileUploader;
  }
}

