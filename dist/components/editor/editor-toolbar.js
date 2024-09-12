var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorToolbarStyle } from '../../styles/editor-toolbar.style';
import ChapterAddedEvent from '../../events/chapter-added';
import '../../icons/icon-plus';
import '../../icons/icon-redo-arrow';
import '../../icons/icon-save';
import '../../icons/icon-trash';
import '../../icons/icon-undo-arrow';
let EditorToolbar = class EditorToolbar extends LitElement {
    constructor() {
        super(...arguments);
        this.timings = [];
        this.ranges = [];
    }
    updated(changedProperties) {
        if (changedProperties.has("files") && (this.files?.length ?? 0) > 0) {
            this.selectedFile = this.files[0];
        }
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
      </div>
    `;
    }
    saveRange() {
        const title = 'chapters';
        const times = this.timings[0];
        const chapterRange = {
            title,
            range: {
                ...times
            }
        };
        this.ranges.push(chapterRange);
        this.dispatchEvent(new ChapterAddedEvent({ bubbles: true, composed: true, detail: chapterRange }));
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
    state()
], EditorToolbar.prototype, "timings", void 0);
__decorate([
    state()
], EditorToolbar.prototype, "files", void 0);
EditorToolbar = __decorate([
    customElement('editor-toolbar')
], EditorToolbar);
export { EditorToolbar };
//# sourceMappingURL=editor-toolbar.js.map