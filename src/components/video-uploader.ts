import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { videoUploaderStyle } from '../styles/video-uploader.style';
import FilesAddedEvent from '../events/files-added';

@customElement('video-uploader')
export class VideoUploader extends LitElement {
  static override styles = videoUploaderStyle;

  override render() {
    return html`
      <div class="video-uploader">
        <h2 class="video-uploader__title text">Add Video</h2>
        <div 
          class="video-uploader__picker text" 
          @dragenter="${this.onDragEnter}" 
          @dragover="${this.onDragOver}"
          @drop="${this.onDrop}" 
          @click="${this.onClick}"
        >
          <input type="file" id="file" class="video-uploader__file" accept="video/*" @change="${this.onSelectFile}" hidden>
          + Upload Video
        </div>
      </div>
    `;
  }

  private onClick() {
    this.shadowRoot?.getElementById('file')?.click();
  }
  
  private onDragEnter (event: DragEvent) {
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
    const files = dt?.files;

    if (files) {
      this.dispatchEvent(new FilesAddedEvent({ bubbles: true, composed: true, detail: { files }}));
    }
  }

  private onSelectFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.dispatchEvent(new CustomEvent(FilesAddedEvent.eventName, { bubbles: true, composed: true, detail: { files }}))
      this.dispatchEvent(new FilesAddedEvent({ bubbles: true, composed: true, detail: { files }}));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-uploader': VideoUploader;
  }
}
