import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { RangeTimings } from '../../types';
// Events
import UpdateTimingsEvent from '../../events/update-timings';
import UpdateProgressEvent from '../../events/update-progress';
import { playbackGrabbersStyle } from '../../styles/playback-grabbers';
import '../../icons/icon-grabber';
import UpdatePlayerContextEvent from '../../events/update-player-context';
import { consume } from '@lit/context';
import { initialPlayerContext, playerContext } from '../../contexts/player-context';
import { GrabbersContext, PlayerContext, SeekableContext } from '../../@types/contexts';
import { initialSeekableContext, seekableContext } from '../../contexts/seekable-context';
import UpdateSeekableContextEvent from '../../events/update-seekable-context';
import { grabbersContext, initialGrabbersContext } from '../../contexts/grabbers-context';
import UpdateGrabbersContextEvent from '../../events/update-grabbers-context';

@customElement('playback-grabbers')
export class PlaybackGrabbers extends LitElement {
  static override styles = playbackGrabbersStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @consume({ context: playerContext, subscribe: true })
  @state()
  private playerCtx: PlayerContext = initialPlayerContext;

  @consume({ context: seekableContext, subscribe: true })
  @state()
  private seekableCtx: SeekableContext = initialSeekableContext;

  @consume({ context: grabbersContext, subscribe: true })
  @state()
  private grabbersCtx: GrabbersContext = initialGrabbersContext;

  override render() {
    const duration = this.playerCtx.duration;

    return html`
      <div id="grabbers">
        ${(this.grabbersCtx.visible && this.timings.length > 0) && this.timings.map((timing, i) => html`
          <div id='grabberStart${i}' class='grabber' style="left: ${timing.start / duration * 100}%"
            @mousedown="${this.handleGrabberMouseDown(i, 'start')}"
            @pointerdown="${this.handleGrabberPointerDown(i, 'start')}"
          >
            <icon-grabber></icon-grabber>
          </div>
          <div id='grabberEnd${i}' class='grabber' style="left: ${timing.end / duration * 100}%"
            @mousedown="${this.handleGrabberMouseDown(i, 'end')}"
            @pointerdown="${this.handleGrabberPointerDown(i, 'end')}"
          >
            <icon-grabber></icon-grabber>
          </div>
        `)}
      </div>
    `;
  }

  private handleMouseMoveWhenGrabbed = (event: MouseEvent) => {
    const duration = this.playerCtx.duration;
    const seekableRect = this.seekableCtx.rect;
    const currentlyGrabbed = this.grabbersCtx.currentlyGrabbed;
    const difference = 0.2;

    const addActiveSegments = () => {
      let colors = ''
      let counter = 0;

      if (this.timings.length > 0) {
        colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings?.[0].start / duration * 100}%`
        for (let times of this.timings) {
          if (counter > 0) {
            colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / duration * 100}%, rgba(240, 240, 240, 0) ${times.start / duration * 100}%`
          }
          colors += `, #655dc2 ${times.start / duration * 100}%, #655dc2 ${times.end / duration * 100}%`
          counter += 1
        }
        colors += `, rgba(240, 240, 240, 0) ${this.timings?.[counter - 1]?.end / duration * 100}%, rgba(240, 240, 240, 0) 100%`
        
        this.dispatchEvent(new UpdateSeekableContextEvent({ style: { backgroundImage: `linear-gradient(to right${colors})` }}));
      }
    }

    this.dispatchEvent(new UpdatePlayerContextEvent({ playing: false }));

    addActiveSegments();

    let seekRatio = (event.clientX - seekableRect!.left) / seekableRect!.width;
    const index = currentlyGrabbed!.index
    const type = currentlyGrabbed!.type
    let time = this.timings;
    let seek = duration * seekRatio
  
    if ((type === 'start') && (seek > ((index !== 0) ? (time[index - 1].end + difference + 0.2) : 0)) && seek < time[index].end - difference) {
      
      this.dispatchEvent(new UpdatePlayerContextEvent({ seek }));

      time[index]['start'] = seek;
      this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: time } }))
      
      const grabberStart = this.shadowRoot?.getElementById(`grabberStart${index}`);
      if (grabberStart) {
        grabberStart.style.left = `${seekRatio * 100}%`;
      }
    } else if ((type === 'end')  && (seek > time[index].start + difference) && (seek < (index !== (this.timings.length - 1) ? time[index].start - difference - 0.2 : duration))) {
      this.dispatchEvent(new UpdatePlayerContextEvent({ seek }));

      time[index]['end'] = seek;
      this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: time } }));
      
      const grabberEnd = this.shadowRoot?.getElementById(`grabberEnd${index}`);
      if (grabberEnd) {
        grabberEnd.style.left = `${seekRatio * 100}%`;
      }
    }
    
    const progressLeft = `${seekRatio * 100}%`;
    const progressWidth = '0%';
    this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { left: progressLeft, width: progressWidth }}));
  }

  private removePointerMoveEventListener = () => {
    window.removeEventListener('pointermove', this.handleMouseMoveWhenGrabbed)
  }
  
  private removeMouseMoveEventListener = () => {
    window.removeEventListener('mousemove', this.handleMouseMoveWhenGrabbed)
  }

  private handleGrabberMouseDown(index: number, type: string) {
    return () => {
      this.dispatchEvent(new UpdateGrabbersContextEvent({ currentlyGrabbed: { index, type } }));
      window.addEventListener('mousemove', this.handleMouseMoveWhenGrabbed);
      window.addEventListener('mouseup', this.removeMouseMoveEventListener);
    }
  }

  private handleGrabberPointerDown(index: number, type: string) {
    return () => {
      this.dispatchEvent(new UpdateGrabbersContextEvent({ currentlyGrabbed: { index, type } }));
      window.addEventListener('pointermove', this.handleMouseMoveWhenGrabbed)
      window.addEventListener('pointerup', this.removePointerMoveEventListener)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-grabbers': PlaybackGrabbers;
  }
}
