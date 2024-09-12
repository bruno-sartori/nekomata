var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
// Events
import UpdateCurrentlyGrabbedEvent from '../../events/update-currently-grabbed';
import UpdateTimingsEvent from '../../events/update-timings';
import UpdateProgressEvent from '../../events/update-progress';
import VideoSeekEvent from '../../events/video-seek';
import VideoPauseEvent from '../../events/video-pause';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';
import { playbackGrabbersStyle } from '../../styles/playback-grabbers';
import '../../icons/icon-grabber';
let PlaybackGrabbers = class PlaybackGrabbers extends LitElement {
    constructor() {
        super(...arguments);
        this.timings = [];
        this.currentlyGrabbed = { index: 0, type: 'none' };
        this.videoDuration = 0;
        this.shouldShowGrabbers = false;
        this.handleMouseMoveWhenGrabbed = (event) => {
            const difference = 0.2;
            const addActiveSegments = () => {
                let colors = '';
                let counter = 0;
                console.log('addActiveSegments', this.timings);
                if (this.timings.length > 0) {
                    colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings?.[0].start / this.videoDuration * 100}%`;
                    for (let times of this.timings) {
                        if (counter > 0) {
                            colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.videoDuration * 100}%`;
                        }
                        colors += `, #655dc2 ${times.start / this.videoDuration * 100}%, #655dc2 ${times.end / this.videoDuration * 100}%`;
                        counter += 1;
                    }
                    colors += `, rgba(240, 240, 240, 0) ${this.timings?.[counter - 1]?.end / this.videoDuration * 100}%, rgba(240, 240, 240, 0) 100%`;
                    this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` } } }));
                }
            };
            this.dispatchEvent(new VideoPauseEvent({ bubbles: true, composed: true }));
            addActiveSegments();
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
                this.dispatchEvent(new VideoSeekEvent({ bubbles: true, composed: true, detail: { seekTime: seek } }));
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
        };
        this.removePointerMoveEventListener = () => {
            window.removeEventListener('pointermove', this.handleMouseMoveWhenGrabbed);
        };
        this.removeMouseMoveEventListener = () => {
            window.removeEventListener('mousemove', this.handleMouseMoveWhenGrabbed);
        };
    }
    render() {
        return html `
      <div id="grabbers">
        ${(this.shouldShowGrabbers && this.timings.length > 0) && this.timings.map((timing, i) => html `
          <div id='grabberStart${i}' class='grabber' style="left: ${timing.start / this.videoDuration * 100}%"
            @mousedown="${this.handleGrabberMouseDown(i, 'start')}"
            @pointerdown="${this.handleGrabberPointerDown(i, 'start')}"
          >
            <icon-grabber></icon-grabber>
          </div>
          <div id='grabberEnd${i}' class='grabber' style="left: ${timing.end / this.videoDuration * 100}%"
            @mousedown="${this.handleGrabberMouseDown(i, 'end')}"
            @pointerdown="${this.handleGrabberPointerDown(i, 'end')}"
          >
            <icon-grabber></icon-grabber>
          </div>
        `)}
      </div>
    `;
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
PlaybackGrabbers.styles = playbackGrabbersStyle;
__decorate([
    state()
], PlaybackGrabbers.prototype, "timings", void 0);
__decorate([
    state()
], PlaybackGrabbers.prototype, "currentlyGrabbed", void 0);
__decorate([
    state()
], PlaybackGrabbers.prototype, "videoDuration", void 0);
__decorate([
    state()
], PlaybackGrabbers.prototype, "shouldShowGrabbers", void 0);
__decorate([
    state()
], PlaybackGrabbers.prototype, "seekableRect", void 0);
PlaybackGrabbers = __decorate([
    customElement('playback-grabbers')
], PlaybackGrabbers);
export { PlaybackGrabbers };
//# sourceMappingURL=playback-grabbers.js.map