import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fileUploaderStyle } from '../../styles/file-uploader.style';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext } from '../../@types/contexts';
import UpdateContentContextEvent from '../../events/update-content-context';
import ShowMetadataEvent from '../../events/show-metadata';
import fileUploadWorkerBlob from '../../workers/file-upload-worker';
import './uploaded-file';
import './metadata-info';
import { Content } from '../../types';

@customElement('file-uploader')
export class FileUploader extends LitElement {
  static override styles = fileUploaderStyle;

  @consume({ context: contentContext, subscribe: true })
  @state()
  private contentCtx: ContentContext = initialContentContext;

  @state()
  metadataIdx: number = -1;

  constructor() {
    super();

    this.addEventListener(ShowMetadataEvent.eventName, ((e: ShowMetadataEvent) => {
      this.metadataIdx = e.detail.index;
    }) as EventListener);
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
          ${Object.keys(this.contentCtx).map((key, index) => html`
            <uploaded-file 
              .content=${this.contentCtx[key]} 
              .index=${index}
            ></uploaded-file>
          `)}
        </div>
      </div>
      <metadata-info 
        .active=${this.metadataIdx !== -1}
        .index=${this.metadataIdx}
        .metadata=${this.contentCtx[this.metadataIdx]?.metadata}
      ></metadata-info>
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
      const newContentCtx: ContentContext = files.reduce((acc: any, _, index: number) => {
        const content: Content = {
          file: files[index],
          progress: 0,
          metadata: {
            title: '',
            description: '',
            director: '',
            cast: [],
            keywords: [],
            genres: [],
            uploadDate: new Date(),
            fileInfo: {},
          },
        };

        acc[index] = content;
        return acc;
      }, {});

      this.dispatchEvent(new UpdateContentContextEvent(newContentCtx));
      this.uploadFiles(files);
    }
  }

  private onSelectFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const files = Array.from((event.target as HTMLInputElement).files as FileList);

    if (files) {
      const newContentCtx: ContentContext = files.reduce((acc: any, _, index: number) => {
        const content: Content = {
          file: files[index],
          progress: 0,
          metadata: {
            title: '',
            description: '',
            director: '',
            cast: [],
            keywords: [],
            genres: [],
            uploadDate: new Date(),
            fileInfo: {},
          },
        };
        acc[index] = content;
        return acc;
      }, {});

      this.dispatchEvent(new UpdateContentContextEvent(newContentCtx));
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
        if (event.data.type === 'done') {
          if (index < totalWorkers) {
            runWorker(worker);
          } else {
            if (--maxWorkers === 0) {
              console.log((new Date).getTime() - start);
            }
  
            worker.terminate();
          }
        } else {
          this.dispatchEvent(new UpdateContentContextEvent({ 
            ...this.contentCtx, 
            [event.data.index]: {
              ...this.contentCtx[event.data.index],
              progress: event.data.value
            }
          }));
        }
      };
      
      worker.postMessage({ file: this.contentCtx[index].file, index });
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
