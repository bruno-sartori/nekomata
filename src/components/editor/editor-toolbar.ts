import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorToolbarStyle } from '../../styles/editor-toolbar.style';
import { ChapterRange, CurrentlyGrabbed, RangeTimings } from '../../types';
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

@customElement('editor-toolbar')
export class EditorToolbar extends LitElement {
  static override styles = editorToolbarStyle;
  
  @property({ type: Array })
  timings: Array<RangeTimings> = [];

  @property({ type: Object })
  currentlyGrabbed?: CurrentlyGrabbed;

  private ranges: Array<ChapterRange> = [];
  private selectedFile: any;
  private videoDuration = 0;

  constructor() {
    super();

    this.addEventListener(FilesAddedEvent.eventName, ((e: FilesAddedEvent) => {
      this.selectedFile = e.detail.files;
    }) as EventListener);

    this.addEventListener(VideoLoadedEvent.eventName, ((e: VideoLoadedEvent) => {
      this.videoDuration = e.detail.duration;
    }) as EventListener);
  }

  override render() {
    return html`
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

  private saveRange() {
    const title = 'chapters';
    const times = this.timings[0];
    this.ranges.push({ title, range: { ...times } });

    const sizeRange = [
      times.start / this.videoDuration * 100,
      times.end / this.videoDuration * 100
    ];

    this.dispatchEvent(new ChapterAddedEvent({ bubbles: true, composed: true, detail: { title, sizeRange } }));
  }

  private exportJson() {
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
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-toolbar': EditorToolbar;
  }
}
