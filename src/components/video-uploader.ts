import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { videoUploaderStyle } from '../styles/video-uploader.style';
import UpdatePlayerContextEvent from '../events/update-player-context';

@customElement('video-uploader')
export class VideoUploader extends LitElement {
  static override styles = videoUploaderStyle;

  override render() {
    return html`
      <div>
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
      const src = URL.createObjectURL(files[0]);
      this.dispatchEvent(new UpdatePlayerContextEvent({ src, playing: true }));
    }
  }

  private onSelectFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  
    const files = (event.target as HTMLInputElement).files;
    
    if (files) {
      const src = URL.createObjectURL(files[0]);
      this.dispatchEvent(new UpdatePlayerContextEvent({ src, playing: true }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'video-uploader': VideoUploader;
  }
}
