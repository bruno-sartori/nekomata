import { LitElement, PropertyValues, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fileUploaderStyle } from '../../styles/file-uploader.style';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext, SettingsContext, UserContext } from '../../@types/contexts';
import UpdateContentContextEvent from '../../events/update-content-context';
import ShowMetadataEvent from '../../events/show-metadata';
import resumableFileUploadWorkerBlob from '../../workers/resumable-file-upload.worker';
import './uploaded-file';
import './metadata-info';
import { Content } from '../../types';
import { initialSettingsContext, settingsContext } from '../../contexts/settings-context';
import { localized, msg } from '@lit/localize';
import Fetcher from '../../utils/fetcher';
import { PendingFile } from '../../@types/api';
import { initialUserContext, userContext } from '../../contexts/user-context';
import UpdateUserContextEvent from '../../events/update-user-context';

@localized()
@customElement('file-uploader')
export class FileUploader extends LitElement {
  static override styles = fileUploaderStyle;

  @consume({ context: contentContext, subscribe: true })
  @state()
  private contentCtx: ContentContext = initialContentContext;

  @consume({ context: settingsContext, subscribe: true })
  @state()
  private settingsCtx: SettingsContext = initialSettingsContext;

  @consume({ context: userContext, subscribe: true })
  @state()
  private userCtx: UserContext = initialUserContext;

  @state()
  metadataIdx: number = -1;

  constructor() {
    super();

    this.addEventListener(ShowMetadataEvent.eventName, ((e: ShowMetadataEvent) => {
      this.metadataIdx = e.detail.index;
    }) as EventListener);
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.initialize();
  }

  override render() {
    return html`
      <div class="file-uploader">
        <h1 class="file-uploader__title text">${msg('Upload files')}</h1>
        <p class="file-uploader__description text">${msg('Add your documents here. You can add up to 10 files.')}</p>
        <div 
          class="file-uploader__picker" 
          @dragenter="${this.onDragEnter}" 
          @dragover="${this.onDragOver}"
          @drop="${this.onDrop}" 
          @click="${this.onClick}"
        >
          <input type="file" id="file" multiple class="file-uploader__file" accept="video/*" @change="${this.onSelectFile}" hidden>
          <h2 class="file-uploader__picker__title text">${msg('Drag & drop files here or choose files')}</h2>
          <p class="file-uploader__picker__description text">${msg('1 GB max file size')}</p>
        </div>
        <h2 class="title-secondary text">${msg('Uploaded Files')}</h2>
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

  private async initialize() {
    const response = await Fetcher.get<{ data: PendingFile[] }>('/upload/pending', { withAuth: true });
    
    this.dispatchEvent(new UpdateUserContextEvent({ 
      ...this.userCtx,
      pendingUploads: response.data
    }));
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
          status: 'pending',
          metadata: {
            title: '',
            description: '',
            director: '',
            cast: [],
            keywords: [],
            genres: [],
            ageRating: this.settingsCtx.ratingSystem === 'ClassInd' ? 'L' : 'G',
            uploadDate: new Date(),
            fileInfo: {},
            contentType: 'MOVIE',
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
          status: 'pending',
          metadata: {
            title: '',
            description: '',
            director: '',
            cast: [],
            keywords: [],
            genres: [],
            ageRating: this.settingsCtx.ratingSystem === 'ClassInd' ? 'L' : 'G',
            uploadDate: new Date(),
            fileInfo: {},
            contentType: 'MOVIE',
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
        switch (event.data.type) {
          case 'uploadStatus': {
            console.log(event.data.status);
            this.dispatchEvent(new UpdateContentContextEvent({ 
              ...this.contentCtx, 
              [event.data.index]: {
                ...this.contentCtx[event.data.index],
                progress: event.data.value,
                status: 'pending'
              }
            }));
          } break;
          case 'done': {
            if (index < totalWorkers) {
              runWorker(worker);
            } else {
              if (--maxWorkers === 0) {
                console.log((new Date).getTime() - start);
              }
    
              worker.terminate();
            }
          } break;
          case 'error': {
            console.error('error', event.data.index, event.data.error);
            this.dispatchEvent(new UpdateContentContextEvent({ 
              ...this.contentCtx, 
              [event.data.index]: {
                ...this.contentCtx[event.data.index],
                status: 'error',
                error: event.data.error
              }
            }));
          } break;
          case 'info': {
            console.log(event.data.message);
          } break;
        }
      };


      const pending = this.userCtx.pendingUploads.find((pending) => pending.name === this.contentCtx[index].file.name);

      console.log(`FIND PENDING`, pending, this.contentCtx[index].file.name, this.userCtx.pendingUploads)

      const token = localStorage.getItem('token');
      worker.postMessage({ 
        file: this.contentCtx[index].file, 
        token, 
        index,
        pending: pending ? pending : undefined, 
      });
      index++;
    }

    for (var i = 0; i < maxWorkers && i < files.length; i++) {
      runWorker(new Worker(resumableFileUploadWorkerBlob));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'file-uploader': FileUploader;
  }
}

