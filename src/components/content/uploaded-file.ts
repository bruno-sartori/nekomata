import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fileUploaderStyle } from '../../styles/uploaded-file.style';
import '../../icons/icon-play';
import '../../icons/icon-close-circle';
import '../../components/content/progress-bar';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext } from '../../@types/contexts';

@customElement('uploaded-file')
export class UploadedFile extends LitElement {
  static override styles = fileUploaderStyle;

  @state()
  file: File | null = null;

  @state()
  index: number = 0;

  @state()
  uploadDate?: Date = undefined;

  @consume({ context: contentContext, subscribe: true })
  @state()
  private contentCtx: ContentContext = initialContentContext;

  override render() {
    const size = (this.file!.size.toString()?.length < 7) ? `${Math.round(+this.file!.size/1024).toFixed(2)}kb` : `${(Math.round(+this.file!.size/1024)/1000).toFixed(2)}MB`
    const progress = this.contentCtx.progress[this.index];

    console.log(progress);

    return html`
      <div class="uploaded-file">
        <div class="uploaded-file__main">
          <div class="uploaded-file__container">
            <div style="margin-left: 0.5rem; margin-right: 1rem;">
              <icon-play></icon-play>
            </div>
            <div class="uploaded-file__info">
              <h1 class="uploaded-file__title text">${this.file?.name}</h1>
              <div class="uploaded-file__meta">
                <p class="uploaded-file__size text">${size}</p>
                ${progress < 100 ? html`<p class="uploaded-file__percentage-complete text">${progress.toFixed(2).toString()}%${` • ${this.getTimeRemaining(this.uploadDate!, progress)}`}</p>` : ''}
              </div>
            </div>
          </div>
          ${progress < 100 ? html`<div class="uploaded-file__progress">
            <progress-bar .progress=${progress}></progress-bar>
          </div>` : ''}
        </div>
        <div style="margin-left: 1rem; margin-right: 0.5rem;">
          <icon-close-circle></icon-close-circle>
        </div>
      </div>
    `;
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
