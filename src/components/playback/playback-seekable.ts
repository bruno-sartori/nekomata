import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { customElement, query, state } from 'lit/decorators.js';
import { playbackSeekableStyle } from '../../styles/playback-seekable.style';
import { RangeTimings } from '../../types';
import UpdateProgressEvent from '../../events/update-progress';
import UpdatePlayerContextEvent from '../../events/update-player-context';
import UpdateSeekableContextEvent from '../../events/update-seekable-context';
import UpdateGrabbersContextEvent from '../../events/update-grabbers-context';
import { initialSeekableContext, seekableContext } from '../../contexts/seekable-context';
import { PlayerContext, SeekableContext } from '../../@types/contexts';
import { initialPlayerContext, playerContext } from '../../contexts/player-context';

@customElement('playback-seekable')
export class PlaybackSeekable extends LitElement {
  static override styles = playbackSeekableStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @query('#seekable')
  seekable?: HTMLDivElement;

  @consume({ context: seekableContext, subscribe: true })
  @state()
  private seekableCtx: SeekableContext = initialSeekableContext;

  @consume({ context: playerContext, subscribe: true })
  @state()
  private playerCtx: PlayerContext = initialPlayerContext;

  constructor() {
    super();

    document.addEventListener('DOMContentLoaded', () => {
      new ResizeObserver(() => {
        this.dispatchEvent(new UpdateSeekableContextEvent({ rect: this.seekable!.getBoundingClientRect() }));
      }).observe(this.seekable!);
    });
  }

  override render() {
    return html`
      <div 
        @click="${this.updateProgress}" 
        class="seekable" 
        id="seekable" 
        style="background-image: ${this.seekableCtx.style.backgroundImage};"
      ></div>
    `;
  }

  private updateProgress(event: MouseEvent) {
    const playbackRect = this.shadowRoot?.getElementById('seekable')?.getBoundingClientRect();

    const duration = this.playerCtx.duration;

    if (playbackRect) {
      this.dispatchEvent(new UpdatePlayerContextEvent({ playing: false }));
      let seek = ((event.clientX - playbackRect?.left) / playbackRect.width) * duration;
      // find where seekTime is in the segment
      let index = -1
      let counter = 0
      for (let times of this.timings) {
        if (seek >= times.start && seek <= times.end) {
          index = counter
        }
        counter += 1
      }

      if (index === -1) {
        return
      }
      const progressWidth = '0%' // Since the width is set later, this is necessary to hide weird UI
      const progressLeft = `${this.timings[index].start / duration * 100}%`;

      this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { width: progressWidth, left: progressLeft } }));
      this.dispatchEvent(new UpdatePlayerContextEvent({ seek }));
      this.dispatchEvent(new UpdateGrabbersContextEvent({ currentlyGrabbed: { index, 'type': 'start' } }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-seekable': PlaybackSeekable;
  }
}
