import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { uploadedFileStyle } from '../../styles/uploaded-file.style';
import ShowMetadataEvent from '../../events/show-metadata';
import { FFprobeWorker, FileInfo } from 'ffprobe-wasm';
import { Content } from '../../types';
import '../../icons/icon-play';
import '../../icons/icon-close-circle';
import '../../icons/icon-exclamation';
import '../../components/content/progress-bar';
import UpdateContentContextEvent from '../../events/update-content-context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext } from '../../@types/contexts';
import { consume } from '@lit/context';

@customElement('uploaded-file')
export class UploadedFile extends LitElement {
  static override styles = uploadedFileStyle;

  @consume({ context: contentContext, subscribe: true })
  @state()
  private contentCtx: ContentContext = initialContentContext;

  @state()
  content: Content | null = null;

  @state()
  index: number = 0;

  protected override firstUpdated(): void {
    const worker = new FFprobeWorker();
    
    worker.getFileInfo(this.content?.file!).then((fileInfo: FileInfo) => {
      this.dispatchEvent(new UpdateContentContextEvent({ 
        ...this.contentCtx, 
        [this.index]: {
          ...this.contentCtx[this.index],
          metadata: {
            ...this.contentCtx[this.index].metadata,
            fileInfo
          }
        }
      }));

      worker.terminate();
    });
  }

  override render() {
    const file = this.content?.file;
    const size = (file!.size.toString()?.length < 7) ? `${Math.round(+file!.size/1024).toFixed(2)}kb` : `${(Math.round(+file!.size/1024)/1000).toFixed(2)}MB`
    const progress = this.content?.progress || 0;
    const uploadedDate = this.content?.metadata.uploadDate;

    return html`
      <div style="display: flex; flex-direction: row; align-items: center;">
        <div class="uploaded-file">
          <div class="uploaded-file__main">
            <div class="uploaded-file__container">
              <div role="button" @onclick=${this.showPlayer} style="margin-left: 0.5rem; margin-right: 1rem;">
                <icon-play></icon-play>
              </div>
              <div class="uploaded-file__info">
                <h1 class="uploaded-file__title text">${file?.name}</h1>
                <div class="uploaded-file__meta">
                  <p class="uploaded-file__size text">${size}</p>
                  ${progress < 100 ? html`<p class="uploaded-file__percentage-complete text">${progress.toFixed(2).toString()}%${` • ${this.getTimeRemaining(uploadedDate!, progress)}`}</p>` : ''}
                </div>
              </div>
            </div>
            ${progress < 100 ? html`<div class="uploaded-file__progress">
              <progress-bar .progress=${progress}></progress-bar>
            </div>` : ''}
          </div>
          <div role="button" style="margin-left: auto; margin-right: 0.5rem;">
            <icon-close-circle></icon-close-circle>
          </div>
        </div>
        <button class="uploaded_file__show-metadata" @click=${this.showMetadata} style="margin-left: 1rem;">
          <icon-exclamation></icon-exclamation>
        </button>
      </div>
    `;
  }

  private showPlayer() {
    console.log('Show player');
  }

  private showMetadata() {
    this.dispatchEvent(new ShowMetadataEvent({ index: this.index }));
  }

  private getTimeRemaining(startTime: Date, percentageComplete: number): string {
    if (percentageComplete <= 0 || percentageComplete >= 100) {
      return '';
    }

    const now = new Date();
    const elapsedTime = now.getTime() - startTime.getTime(); // Time elapsed in milliseconds
    const estimatedTotalTime = (elapsedTime / (percentageComplete / 100)); // Total estimated time
    const remainingTime = estimatedTotalTime - elapsedTime; // Time remaining in milliseconds

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    const timeParts: string[] = [];

    if (days > 0) timeParts.push(`${days} days`);
    if (hours > 0) timeParts.push(`${hours} hours`);
    if (minutes > 0) timeParts.push(`${minutes} min`);
    if (seconds > 0) timeParts.push(`${seconds} sec`);

    return timeParts.length > 0 ? `${timeParts.join(' ')} left` : '0 sec left';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uploaded-file': UploadedFile;
  }
}
