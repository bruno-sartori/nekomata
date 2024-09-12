var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorPlaybackStyle } from '../../styles/editor-playback.style';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
let EditorPlayback = class EditorPlayback extends LitElement {
    constructor() {
        super(...arguments);
        this.timings = [];
        this.videoDuration = 0;
        this.shouldShowGrabbers = false;
        this.seekableStyle = {
            backgroundImage: ''
        };
        this.progress = {};
        this.snapshots = [];
    }
    render() {
        return html `
      <div class="playback" id="playback">
        <playback-grabbers 
          .shouldShowGrabbers=${this.shouldShowGrabbers} 
          .videoDuration=${this.videoDuration} 
          .timings=${this.timings}
          .currentlyGrabbed=${this.currentlyGrabbed}
          .seekableRect=${this.seekableRect}
        ></playback-grabbers>
        <playback-snapshots .snapshots=${this.snapshots}></playback-snapshots>
        <playback-seekable 
          .videoDuration=${this.videoDuration} 
          .timings=${this.timings}
          .seekableStyle=${this.seekableStyle}
        ></playback-seekable>
        <playback-progress .progress=${this.progress}></playback-progress>
      </div>
    `;
    }
};
EditorPlayback.styles = editorPlaybackStyle;
__decorate([
    state()
], EditorPlayback.prototype, "timings", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "currentlyGrabbed", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "videoDuration", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "shouldShowGrabbers", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "seekableRect", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "seekableStyle", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "progress", void 0);
__decorate([
    state()
], EditorPlayback.prototype, "snapshots", void 0);
EditorPlayback = __decorate([
    customElement('editor-playback')
], EditorPlayback);
export { EditorPlayback };
//# sourceMappingURL=editor-playback.js.map