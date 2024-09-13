import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fileUploaderStyle } from '../../styles/uploaded-file.style';
import '../../icons/icon-play';
import '../../icons/icon-close-circle';
import '../../components/content/progress-bar';

@customElement('uploaded-file')
export class UploadedFile extends LitElement {
  static override styles = fileUploaderStyle;

  @state()
  file: File | null = null;

  @state()
  progress: number = 0;

  override render() {
    const size = (this.file!.size.toString()?.length < 7) ? `${Math.round(+this.file!.size/1024).toFixed(2)}kb` : `${(Math.round(+this.file!.size/1024)/1000).toFixed(2)}MB`

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
                <p class="uploaded-file__percentage-complete text">40% • 2 sec left</p>
              </div>
            </div>
          </div>
          <div class="uploaded-file__progress">
            <progress-bar .progress=${this.progress}></progress-bar>
          </div>
        </div>
        <div style="margin-left: 1rem; margin-right: 0.5rem;">
          <icon-close-circle></icon-close-circle>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uploaded-file': UploadedFile;
  }
}
