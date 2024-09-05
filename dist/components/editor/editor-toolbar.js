var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorToolbarStyle } from '../../styles/editor-toolbar.style';
import ChapterAddedEvent from '../../events/chapter-added';
import FilesAddedEvent from '../../events/files-added';
import VideoLoadedEvent from '../../events/video-loaded';
import './editor-sidebar';
import './editor-timeline';
import '../../icons/icon-plus';
import '../../icons/icon-redo-arrow';
import '../../icons/icon-save';
import '../../icons/icon-trash';
import '../../icons/icon-undo-arrow';
let EditorToolbar = class EditorToolbar extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.ranges = [];
        this.videoDuration = 0;
        this.addEventListener(FilesAddedEvent.eventName, ((e) => {
            this.selectedFile = e.detail.files;
        }));
        this.addEventListener(VideoLoadedEvent.eventName, ((e) => {
            this.videoDuration = e.detail.duration;
        }));
    }
    render() {
        return html `
      <div class="toolbar">
        <div class="toolbar__group">
          <button title="undo" class="toolbar__button">
          <icon-undo-arrow></icon-undo-arrow>
          </button>
          <button title="redo" class="toolbar__button">
            <icon-redo-arrow></icon-redo-arrow>
          </button>
          <button @click="${this.saveRange}" title="add" class="toolbar__button">
            <icon-plus></icon-plus>
          </button>
        </div>
        <div class="toolbar__group">
          <strong class="toolbar__timeinfo text" id="timeInfo">00:00:00 / 00:00:00</strong>
        </div>
        <div class="toolbar__group">
          <button @click="${this.exportJson}" title="save" class="toolbar__button">
            <icon-save></icon-save>
          </button>
          <button title="delete" class="toolbar__button">
            <icon-trash></icon-trash>
          </button>
        </div>
        <editor-timeline .timings=${this.timings} .currentlyGrabbed=${this.currentlyGrabbed}></editor-timeline>
      </div>
    `;
    }
    saveRange() {
        const title = 'chapters';
        const times = this.timings[0];
        this.ranges.push({ title, range: { ...times } });
        const sizeRange = [
            times.start / this.videoDuration * 100,
            times.end / this.videoDuration * 100
        ];
        this.dispatchEvent(new ChapterAddedEvent({ bubbles: true, composed: true, detail: { title, sizeRange } }));
    }
    exportJson() {
        const json = {
            fileName: this.selectedFile.name,
            chapters: this.ranges,
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
        const name = 'video-chapters.json';
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = name;
        anchor.click();
    }
};
EditorToolbar.styles = editorToolbarStyle;
__decorate([
    property({ type: Array })
], EditorToolbar.prototype, "timings", void 0);
__decorate([
    property({ type: Object })
], EditorToolbar.prototype, "currentlyGrabbed", void 0);
EditorToolbar = __decorate([
    customElement('editor-toolbar')
], EditorToolbar);
export { EditorToolbar };
//# sourceMappingURL=editor-toolbar.js.map