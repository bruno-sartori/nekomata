var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import VideoLoadedEvent from '../../events/video-loaded';
import AddGrabbersEvent from '../../events/add-grabbers';
import UpdateCurrentlyGrabbedEvent from '../../events/update-currently-grabbed';
import UpdateTimingsEvent from '../../events/update-timings';
import UpdateProgressEvent from '../../events/update-progress';
import VideoSeekEvent from '../../events/video-seek';
import VideoPauseEvent from '../../events/video-pause';
import SeekableResizedEvent from '../../events/seekable-resized';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';
let PlaybackGrabbers = class PlaybackGrabbers extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.currentlyGrabbed = { index: 0, type: 'none' };
        this.videoDuration = 0;
        this.shouldShowGrabbers = false;
        this.addEventListener(VideoLoadedEvent.eventName, ((e) => {
            this.videoDuration = e.detail.duration;
        }));
        this.addEventListener(AddGrabbersEvent.eventName, (() => {
            this.shouldShowGrabbers = true;
        }));
        this.addEventListener(SeekableResizedEvent.eventName, ((e) => {
            this.seekableRect = e.detail.rect;
        }));
    }
    render() {
        return html `
      <div id="grabbers">
        ${(this.shouldShowGrabbers && this.timings.length > 0) && this.timings.map((timing, i) => html `
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
    addActiveSegments() {
        let colors = '';
        let counter = 0;
        colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings[0].start / this.videoDuration * 100}%`;
        for (let times of this.timings) {
            if (counter > 0) {
                colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.videoDuration * 100}%`;
            }
            colors += `, #655dc2 ${times.start / this.videoDuration * 100}%, #655dc2 ${times.end / this.videoDuration * 100}%`;
            counter += 1;
        }
        colors += `, rgba(240, 240, 240, 0) ${this.timings[counter - 1].end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) 100%`;
        this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` } } }));
    }
    handleMouseMoveWhenGrabbed(event) {
        const difference = 0.2;
        this.dispatchEvent(new VideoPauseEvent({ bubbles: true, composed: true }));
        this.addActiveSegments();
        let seekRatio = (event.clientX - this.seekableRect.left) / this.seekableRect.width;
        const index = this.currentlyGrabbed.index;
        const type = this.currentlyGrabbed.type;
        let time = this.timings;
        let seek = this.videoDuration * seekRatio;
        if ((type === 'start') && (seek > ((index !== 0) ? (time[index - 1].end + difference + 0.2) : 0)) && seek < time[index].end - difference) {
            this.dispatchEvent(new VideoSeekEvent({ bubbles: true, composed: true, detail: { seekTime: seek } }));
            time[index]['start'] = seek;
            this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: time } }));
            const grabberStart = this.shadowRoot?.getElementById(`grabberStart${index}`);
            if (grabberStart) {
                grabberStart.style.left = `${seekRatio * 100}%`;
            }
        }
        else if ((type === 'end') && (seek > time[index].start + difference) && (seek < (index !== (this.timings.length - 1) ? time[index].start - difference - 0.2 : this.videoDuration))) {
            time[index]['end'] = seek;
            this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: time } }));
            const grabberEnd = this.shadowRoot?.getElementById(`grabberEnd${index}`);
            if (grabberEnd) {
                grabberEnd.style.left = `${seekRatio * 100}%`;
            }
        }
        const progressLeft = `${seekRatio * 100}%`;
        const progressWidth = '0%';
        this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { left: progressLeft, width: progressWidth } }));
    }
    removePointerMoveEventListener() {
        window.removeEventListener('pointermove', this.handleMouseMoveWhenGrabbed);
    }
    removeMouseMoveEventListener() {
        window.removeEventListener('mousemove', this.handleMouseMoveWhenGrabbed);
    }
    handleGrabberMouseDown(index, type) {
        return () => {
            this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { index, type } }));
            window.addEventListener('mousemove', this.handleMouseMoveWhenGrabbed);
            window.addEventListener('mouseup', this.removeMouseMoveEventListener);
        };
    }
    handleGrabberPointerDown(index, type) {
        return () => {
            this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { index, type } }));
            window.addEventListener('pointermove', this.handleMouseMoveWhenGrabbed);
            window.addEventListener('pointerup', this.removePointerMoveEventListener);
        };
    }
};
__decorate([
    property({ type: Array })
], PlaybackGrabbers.prototype, "timings", void 0);
__decorate([
    property({ type: Object })
], PlaybackGrabbers.prototype, "currentlyGrabbed", void 0);
PlaybackGrabbers = __decorate([
    customElement('playback-grabbers')
], PlaybackGrabbers);
export { PlaybackGrabbers };
//# sourceMappingURL=playback-grabbers.js.map