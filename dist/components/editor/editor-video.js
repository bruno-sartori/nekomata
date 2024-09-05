var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { videoSidebarStyle } from '../../styles/editor-video.style';
import VideoTimeUpdatedEvent from '../../events/video-time-update';
import VideoLoadedEvent from '../../events/video-loaded';
import VideoPauseEvent from '../../events/video-pause';
import UpdateTimingsEvent from '../../events/update-timings';
import AddGrabbersEvent from '../../events/add-grabbers';
import UpdateTimeInfoEvent from '../../events/update-time-info';
import { secondsToHours, secondsToMinutes } from '../../utils/time';
import FillTimelineEvent from '../../events/fill-timeline';
import AppendSnapshotEvent from '../../events/append-snapshot';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';
let EditorVideo = class EditorVideo extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.videoPlaying = false;
        this.videoSeekTime = 0;
        this.videoSrc = '';
        console.log(this.videoSeekTime);
        this.addEventListener(VideoPauseEvent.eventName, () => {
            this.video?.pause();
        });
    }
    updated(changedProperties) {
        console.log(`updated(). changedProps: `, changedProperties);
        console.log(changedProperties.has("videoSrc"));
        if (changedProperties.has("videoSrc")) {
            this.video.src = this.videoSrc;
            this.video?.play();
        }
        if (changedProperties.has('videoPlaying')) {
            if (this.videoPlaying) {
                this.video?.play();
            }
            else {
                this.video?.pause();
            }
        }
        if (changedProperties.has('videoSeekTime')) {
            this.video.currentTime = this.videoSeekTime;
        }
    }
    render() {
        return html `
      <div class="wrapper">
        <video 
          id="video" 
          autoload="metadata"
          class="video" 
          @click="${this.handleTogglePlayer}" 
          @timeupdate="${this.handleTimeUpdate}" 
          @loadeddata="${this.handleMediaLoaded}"
          @loadedmetadata="${this.handleLoadedMetadata}"
        ></video>
      </div>
    `;
    }
    fillVideoInfo() {
        const currentTime = this.video.currentTime;
        const duration = this.video.duration;
        this.dispatchEvent(new UpdateTimeInfoEvent({ bubbles: true, composed: true, detail: { currentTime, duration } }));
        const durationHours = secondsToHours(this.video.duration);
        const durationMinutes = secondsToMinutes(this.video.duration);
        const timelineDuration = durationHours > 1 ? durationHours : durationMinutes;
        const timelineMetric = durationHours > 1 ? 'hours' : 'minutes';
        this.dispatchEvent(new FillTimelineEvent({ bubbles: true, composed: true, detail: { duration: timelineDuration, metric: timelineMetric } }));
    }
    handleTogglePlayer() {
        if (this.video?.paused) {
            this.video.play();
        }
        else {
            this.video?.pause();
        }
    }
    handleTimeUpdate() {
        const seek = this.video.currentTime / this.video.duration * 100;
        this.dispatchEvent(new VideoTimeUpdatedEvent({ bubbles: true, composed: true, detail: { seek, currentTime: this.video.currentTime, duration: this.video.duration } }));
    }
    handleMediaLoaded() {
        this.dispatchEvent(new VideoLoadedEvent({ bubbles: true, composed: true, detail: { duration: this.video.duration } }));
    }
    capture() {
        const height = 90;
        const width = Math.round((16 / 9) * height);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(this.video, 0, 0, width, height);
        this.dispatchEvent(new AppendSnapshotEvent({ bubbles: true, composed: true, detail: { snapshot: canvas } }));
    }
    createSnapshotList() {
        this.video?.addEventListener('seeked', this.capture);
        const updateTime = () => {
            let i = 1;
            const interval = setInterval(() => {
                this.video.currentTime = i * 15;
                i++;
                if (i === 16) {
                    clearInterval(interval);
                }
            }, 500);
        };
        updateTime();
    }
    addActiveSegments() {
        let colors = '';
        let counter = 0;
        colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings[0].start / this.video.duration * 100}%`;
        for (let times of this.timings) {
            if (counter > 0) {
                colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.video.duration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.video.duration * 100}%`;
            }
            colors += `, #655dc2 ${times.start / this.video.duration * 100}%, #655dc2 ${times.end / this.video.duration * 100}%`;
            counter += 1;
        }
        colors += `, rgba(240, 240, 240, 0) ${this.timings[counter - 1].end / this.video.duration * 100}%, rgba(240, 240, 240, 0) 100%`;
        this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` } } }));
    }
    handleLoadedMetadata() {
        if (this.timings.length === 0) {
            this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: [{ start: 0, end: 120 }] } }));
            this.dispatchEvent(new AddGrabbersEvent({ bubbles: true, composed: true }));
        }
        this.fillVideoInfo();
        this.createSnapshotList();
        this.addActiveSegments();
    }
};
EditorVideo.styles = videoSidebarStyle;
__decorate([
    property({ type: Array })
], EditorVideo.prototype, "timings", void 0);
__decorate([
    property({ type: Boolean })
], EditorVideo.prototype, "videoPlaying", void 0);
__decorate([
    state()
], EditorVideo.prototype, "videoSeekTime", void 0);
__decorate([
    state()
], EditorVideo.prototype, "videoSrc", void 0);
__decorate([
    query('#video')
], EditorVideo.prototype, "video", void 0);
EditorVideo = __decorate([
    customElement('editor-video')
], EditorVideo);
export { EditorVideo };
//# sourceMappingURL=editor-video.js.map