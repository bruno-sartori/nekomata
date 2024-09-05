var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import { nekomataStyle } from './styles/nekomata.style';
import UpdateCurrentlyGrabbedEvent from './events/update-currently-grabbed';
import VideoPauseEvent from './events/video-pause';
import VideoSeekEvent from './events/video-seek';
import FilesAddedEvent from './events/files-added';
let Nekomata = class Nekomata extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.currentlyGrabbed = { index: 0, type: 'none' };
        this.videoPlaying = false;
        this.videoSeekTime = 0;
        this.videoSrc = '';
        this.addEventListener(UpdateCurrentlyGrabbedEvent.eventName, ((e) => {
            this.currentlyGrabbed = e.detail;
        }));
        this.addEventListener(VideoPauseEvent.eventName, () => {
            this.videoPlaying = false;
        });
        this.addEventListener(VideoSeekEvent.eventName, ((e) => {
            this.videoSeekTime = e.detail.seekTime;
        }));
        this.addEventListener(FilesAddedEvent.eventName, ((e) => {
            console.log('AQUIIII');
            this.videoSrc = URL.createObjectURL(e.detail.files[0]);
            this.videoPlaying = true;
        }));
        console.log(this.videoSeekTime);
    }
    render() {
        return html `
      <main class="nekomata-editor">
        <aside class="sidebar">
          <editor-sidebar></editor-sidebar>
        </aside>
        <section class="editor">
          <editor-video 
            .timings=${this.timings} 
            .videoPlaying=${this.videoPlaying} 
            .videoSeekTime=${this.videoSeekTime} 
            .videoSrc=${this.videoSrc}>
          </editor-video>
        </section>
        <footer id="footer">
          <editor-toolbar .timings=${this.timings} .currentlyGrabbed=${this.currentlyGrabbed}></editor-toolbar>
        </footer>
      </main>
    `;
    }
};
Nekomata.styles = nekomataStyle;
__decorate([
    state()
], Nekomata.prototype, "videoPlaying", void 0);
__decorate([
    state()
], Nekomata.prototype, "videoSeekTime", void 0);
__decorate([
    state()
], Nekomata.prototype, "videoSrc", void 0);
Nekomata = __decorate([
    customElement('nekomata-editor')
], Nekomata);
export { Nekomata };
//# sourceMappingURL=index.js.map