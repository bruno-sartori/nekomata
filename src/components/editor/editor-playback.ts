import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorPlaybackStyle } from '../../styles/editor-playback.style';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
import { CurrentlyGrabbed, Progress, RangeTimings, SeekableStyle } from '../../types';

@customElement('editor-playback')
export class EditorPlayback extends LitElement {
  static override styles = editorPlaybackStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @state()
  currentlyGrabbed?: CurrentlyGrabbed;

  @state()
  videoDuration = 0;
  
  @state()
  shouldShowGrabbers = false;

  @state()
  seekableRect?: DOMRect;

  @state()
  seekableStyle: SeekableStyle = {
    backgroundImage: ''
  };

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  override render() {
    return html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-playback': EditorPlayback;
  }
}
