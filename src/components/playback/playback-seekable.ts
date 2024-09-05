import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { playbackSeekableStyle } from '../../styles/playback-seekable.style';
import { RangeTimings } from '../../types';
import VideoLoadedEvent from '../../events/video-loaded';
import VideoPauseEvent from '../../events/video-pause';
import VideoSeekEvent from '../../events/video-seek';
import UpdateProgressEvent from '../../events/update-progress';
import UpdateCurrentlyGrabbedEvent from '../../events/update-currently-grabbed';
import SeekableResizedEvent from '../../events/seekable-resized';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';

@customElement('playback-seekable')
export class PlaybackSeekable extends LitElement {
  static override styles = playbackSeekableStyle;

  private videoDuration: number;

  private backgroundImage = '';

  @property({ type: Array })
  timings: Array<RangeTimings> = [];

  @query('#seekable')
  seekable?: HTMLDivElement;

  constructor() {
    super();

    this.videoDuration = 0;

    this.addEventListener(VideoLoadedEvent.eventName, ((e: VideoLoadedEvent) => {
      this.videoDuration = e.detail.duration;
    }) as EventListener);

    this.addEventListener(UpdateSeekableStyleEvent.eventName, ((e: UpdateSeekableStyleEvent) => {
      this.backgroundImage = e.detail.style.backgroundImage;
    }) as EventListener);

    document.addEventListener('DOMContentLoaded', () => {
      new ResizeObserver(() => {
        this.dispatchEvent(new SeekableResizedEvent({ bubbles: true, composed: true, detail: { rect: this.seekable!.getBoundingClientRect() }}))
      }).observe(this.seekable!);
    })

  }

  override render() {
    return html`
      <div @click="${this.updateProgress}" class="seekable" id="seekable" style="background-image: ${this.backgroundImage};"></div>
    `;
  }

  private updateProgress(event: MouseEvent) {
    const playbackRect = this.shadowRoot?.getElementById('seekable')?.getBoundingClientRect();

    if (playbackRect) {
      this.dispatchEvent(new VideoPauseEvent({ bubbles: true, composed: true }));
      let seekTime = ((event.clientX - playbackRect?.left) / playbackRect.width) * this.videoDuration;
      // find where seekTime is in the segment
      let index = -1
      let counter = 0
      for (let times of this.timings) {
        if (seekTime >= times.start && seekTime <= times.end) {
          index = counter
        }
        counter += 1
      }

      if (index === -1) {
        return
      }
      const progressWidth = '0%' // Since the width is set later, this is necessary to hide weird UI
      const progressLeft = `${this.timings[index].start / this.videoDuration * 100}%`;

      this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { width: progressWidth, left: progressLeft } }));
      this.dispatchEvent(new VideoSeekEvent({ bubbles: true, composed: true, detail: { seekTime } }));
      this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { 'index': index, 'type': 'start' } }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-seekable': PlaybackSeekable;
  }
}
