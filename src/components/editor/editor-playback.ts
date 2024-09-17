import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorPlaybackStyle } from '../../styles/editor-playback.style';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
import { Progress, RangeTimings } from '../../types';

@customElement('editor-playback')
export class EditorPlayback extends LitElement {
  static override styles = editorPlaybackStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  override render() {
    return html`
      <div class="playback" id="playback">
        <playback-grabbers .timings=${this.timings}></playback-grabbers>
        <playback-snapshots .snapshots=${this.snapshots}></playback-snapshots>
        <playback-seekable 
          .timings=${this.timings}
        ></playback-seekable>
        <playback-progress .progress=${this.progress}></playback-progress>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-playback': EditorPlayback;
  }
}
