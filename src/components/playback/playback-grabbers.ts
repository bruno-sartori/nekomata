import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CurrentlyGrabbed, RangeTimings } from '../../types';
import VideoLoadedEvent from '../../events/video-loaded';
import AddGrabbersEvent from '../../events/add-grabbers';
import UpdateCurrentlyGrabbedEvent from '../../events/update-currently-grabbed';
import UpdateTimingsEvent from '../../events/update-timings';
import UpdateProgressEvent from '../../events/update-progress';
import VideoSeekEvent from '../../events/video-seek';
import VideoPauseEvent from '../../events/video-pause';
import SeekableResizedEvent from '../../events/seekable-resized';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';

@customElement('playback-grabbers')
export class PlaybackGrabbers extends LitElement {

  @property({ type: Array })
  timings: Array<RangeTimings> = [];

  @property({ type: Object })
  currentlyGrabbed?: CurrentlyGrabbed = { index: 0, type: 'none' };

  private videoDuration = 0;

  private shouldShowGrabbers = false;

  private seekableRect?: DOMRect;

  constructor() {
    super();

    this.addEventListener(VideoLoadedEvent.eventName, ((e: VideoLoadedEvent) => {
      this.videoDuration = e.detail.duration;
    }) as EventListener);

    this.addEventListener(AddGrabbersEvent.eventName, (() => {
      this.shouldShowGrabbers = true;
    }) as EventListener);

    this.addEventListener(SeekableResizedEvent.eventName, ((e: SeekableResizedEvent) => {
      this.seekableRect = e.detail.rect
    }) as EventListener);
  }

  override render() {
    return html`
      <div id="grabbers">
        ${(this.shouldShowGrabbers && this.timings.length > 0) && this.timings.map((timing, i) => html`
          <div id='grabberStart${i}' class='grabber' style="left: ${timing.start / this.videoDuration * 100}%"
            onMouseDown="handleGrabberMouseDown(event, ${i}, 'start')"
            onPointerDown="handleGrabberPointerDown(event, ${i}, 'start')"
          >
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='10' height='14' viewBox='0 0 10 14' xmlSpace='preserve'>
              <path class='st0' d='M1 14L1 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C2 13.6 1.6 14 1 14zM5 14L5 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C6 13.6 5.6 14 5 14zM9 14L9 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C10 13.6 9.6 14 9 14z'/>
            </svg>
          </div>
          <div id='grabberEnd${i}' class='grabber' style="left: ${timing.end / this.videoDuration * 100}%"
            onMouseDown="${this.handleGrabberMouseDown(i, 'end')}"
            onPointerDown="${this.handleGrabberPointerDown(i, 'end')}"
          >
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='10' height='14' viewBox='0 0 10 14' xmlSpace='preserve'>
              <path class='st0' d='M1 14L1 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C2 13.6 1.6 14 1 14zM5 14L5 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C6 13.6 5.6 14 5 14zM9 14L9 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C10 13.6 9.6 14 9 14z'/>
            </svg>
          </div>
        `)}
      </div>
    `;
  }

  private addActiveSegments() {
    let colors = ''
    let counter = 0;
    
    colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings[0].start / this.videoDuration * 100}%`
    for (let times of this.timings) {
      if (counter > 0) {
        colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.videoDuration * 100}%`
      }
      colors += `, #655dc2 ${times.start / this.videoDuration * 100}%, #655dc2 ${times.end / this.videoDuration * 100}%`
      counter += 1
    }
    colors += `, rgba(240, 240, 240, 0) ${this.timings[counter - 1].end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) 100%`
    
    this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` }}}));
  }

  private handleMouseMoveWhenGrabbed(event: MouseEvent) {
    const difference = 0.2;
    
    this.dispatchEvent(new VideoPauseEvent({ bubbles: true, composed: true }));

    this.addActiveSegments();

    let seekRatio = (event.clientX - this.seekableRect!.left) / this.seekableRect!.width;
    const index = this.currentlyGrabbed!.index
    const type = this.currentlyGrabbed!.type
    let time = this.timings;
    let seek = this.videoDuration * seekRatio
  
    if ((type === 'start') && (seek > ((index !== 0) ? (time[index - 1].end + difference + 0.2) : 0)) && seek < time[index].end - difference) {
      this.dispatchEvent(new VideoSeekEvent({ bubbles: true, composed: true, detail: { seekTime: seek } }));

      time[index]['start'] = seek;
      this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: time } }))
      
      const grabberStart = this.shadowRoot?.getElementById(`grabberStart${index}`);
      if (grabberStart) {
        grabberStart.style.left = `${seekRatio * 100}%`;
      }
    } else if ((type === 'end')  && (seek > time[index].start + difference) && (seek < (index !== (this.timings.length - 1) ? time[index].start - difference - 0.2 : this.videoDuration))) {
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

  private removePointerMoveEventListener() {
    window.removeEventListener('pointermove', this.handleMouseMoveWhenGrabbed)
  }
  
  private removeMouseMoveEventListener() {
    window.removeEventListener('mousemove', this.handleMouseMoveWhenGrabbed)
  }

  private handleGrabberMouseDown(index: number, type: string) {
    return () => {
      this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { index, type }}));
      window.addEventListener('mousemove', this.handleMouseMoveWhenGrabbed);
      window.addEventListener('mouseup', this.removeMouseMoveEventListener);
    }
  }

  private handleGrabberPointerDown(index: number, type: string) {
    return () => {
      this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { index, type }}));
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
