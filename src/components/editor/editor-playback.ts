import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorPlaybackStyle } from '../../styles/editor-playback.style';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
import { CurrentlyGrabbed, RangeTimings } from '../../types';

@customElement('editor-playback')
export class EditorPlayback extends LitElement {
  static override styles = editorPlaybackStyle;

  @property({ type: Array })
  timings: Array<RangeTimings> = [];

  @property({ type: Object })
  currentlyGrabbed?: CurrentlyGrabbed;

  constructor() {
    super();
  }

  override render() {
    return html`
      <div class="playback" id="playback">
        <playback-grabbers .timings=${this.timings} .currentlyGrabbed=${this.currentlyGrabbed}></playback-grabbers>
        <playback-snapshots></playback-snapshots>
        <playback-seekable .timings=${this.timings}></playback-seekable>
        <playback-progress></playback-progress>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-playback': EditorPlayback;
  }
}
