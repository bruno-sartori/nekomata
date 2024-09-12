var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { videoUploaderStyle } from '../styles/video-uploader.style';
import FilesAddedEvent from '../events/files-added';
let VideoUploader = class VideoUploader extends LitElement {
    render() {
        return html `
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
    onClick() {
        this.shadowRoot?.getElementById('file')?.click();
    }
    onDragEnter(event) {
        const outputEl = document.getElementById('output');
        if (outputEl) {
            outputEl.textContent = '';
        }
        event.stopPropagation();
        event.preventDefault();
    }
    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
    }
    onDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        const dt = event.dataTransfer;
        const files = dt?.files;
        if (files) {
            this.dispatchEvent(new FilesAddedEvent({ bubbles: true, composed: true, detail: { files } }));
        }
    }
    onSelectFile(event) {
        event.stopPropagation();
        event.preventDefault();
        const files = event.target.files;
        if (files) {
            this.dispatchEvent(new FilesAddedEvent({ bubbles: true, composed: true, detail: { files } }));
        }
    }
};
VideoUploader.styles = videoUploaderStyle;
VideoUploader = __decorate([
    customElement('video-uploader')
], VideoUploader);
export { VideoUploader };
//# sourceMappingURL=video-uploader.js.map