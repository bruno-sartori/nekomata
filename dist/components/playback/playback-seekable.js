var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { playbackSeekableStyle } from '../../styles/playback-seekable.style';
import VideoLoadedEvent from '../../events/video-loaded';
import VideoPauseEvent from '../../events/video-pause';
import VideoSeekEvent from '../../events/video-seek';
import UpdateProgressEvent from '../../events/update-progress';
import UpdateCurrentlyGrabbedEvent from '../../events/update-currently-grabbed';
import SeekableResizedEvent from '../../events/seekable-resized';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';
let PlaybackSeekable = class PlaybackSeekable extends LitElement {
    constructor() {
        super();
        this.backgroundImage = '';
        this.timings = [];
        this.videoDuration = 0;
        this.addEventListener(VideoLoadedEvent.eventName, ((e) => {
            this.videoDuration = e.detail.duration;
        }));
        this.addEventListener(UpdateSeekableStyleEvent.eventName, ((e) => {
            this.backgroundImage = e.detail.style.backgroundImage;
        }));
        document.addEventListener('DOMContentLoaded', () => {
            new ResizeObserver(() => {
                this.dispatchEvent(new SeekableResizedEvent({ bubbles: true, composed: true, detail: { rect: this.seekable.getBoundingClientRect() } }));
            }).observe(this.seekable);
        });
    }
    render() {
        return html `
      <div @click="${this.updateProgress}" class="seekable" id="seekable" style="background-image: ${this.backgroundImage};"></div>
    `;
    }
    updateProgress(event) {
        const playbackRect = this.shadowRoot?.getElementById('seekable')?.getBoundingClientRect();
        if (playbackRect) {
            this.dispatchEvent(new VideoPauseEvent({ bubbles: true, composed: true }));
            let seekTime = ((event.clientX - playbackRect?.left) / playbackRect.width) * this.videoDuration;
            // find where seekTime is in the segment
            let index = -1;
            let counter = 0;
            for (let times of this.timings) {
                if (seekTime >= times.start && seekTime <= times.end) {
                    index = counter;
                }
                counter += 1;
            }
            if (index === -1) {
                return;
            }
            const progressWidth = '0%'; // Since the width is set later, this is necessary to hide weird UI
            const progressLeft = `${this.timings[index].start / this.videoDuration * 100}%`;
            this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { width: progressWidth, left: progressLeft } }));
            this.dispatchEvent(new VideoSeekEvent({ bubbles: true, composed: true, detail: { seekTime } }));
            this.dispatchEvent(new UpdateCurrentlyGrabbedEvent({ bubbles: true, composed: true, detail: { 'index': index, 'type': 'start' } }));
        }
    }
};
PlaybackSeekable.styles = playbackSeekableStyle;
__decorate([
    property({ type: Array })
], PlaybackSeekable.prototype, "timings", void 0);
__decorate([
    query('#seekable')
], PlaybackSeekable.prototype, "seekable", void 0);
PlaybackSeekable = __decorate([
    customElement('playback-seekable')
], PlaybackSeekable);
export { PlaybackSeekable };
//# sourceMappingURL=playback-seekable.js.map