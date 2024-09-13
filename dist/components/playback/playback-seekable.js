var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { consume } from '@lit/context';
import { customElement, query, state } from 'lit/decorators.js';
import { playbackSeekableStyle } from '../../styles/playback-seekable.style';
import UpdateProgressEvent from '../../events/update-progress';
import UpdatePlayerContextEvent from '../../events/update-player-context';
import UpdateSeekableContextEvent from '../../events/update-seekable-context';
import UpdateGrabbersContextEvent from '../../events/update-grabbers-context';
import { initialSeekableContext, seekableContext } from '../../contexts/seekable-context';
import { initialPlayerContext, playerContext } from '../../contexts/player-context';
let PlaybackSeekable = class PlaybackSeekable extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.seekableCtx = initialSeekableContext;
        this.playerCtx = initialPlayerContext;
        document.addEventListener('DOMContentLoaded', () => {
            new ResizeObserver(() => {
                this.dispatchEvent(new UpdateSeekableContextEvent({ rect: this.seekable.getBoundingClientRect() }));
            }).observe(this.seekable);
        });
    }
    render() {
        return html `
      <div 
        @click="${this.updateProgress}" 
        class="seekable" 
        id="seekable" 
        style="background-image: ${this.seekableCtx.style.backgroundImage};"
      ></div>
    `;
    }
    updateProgress(event) {
        const playbackRect = this.shadowRoot?.getElementById('seekable')?.getBoundingClientRect();
        const duration = this.playerCtx.duration;
        if (playbackRect) {
            this.dispatchEvent(new UpdatePlayerContextEvent({ playing: false }));
            let seek = ((event.clientX - playbackRect?.left) / playbackRect.width) * duration;
            // find where seekTime is in the segment
            let index = -1;
            let counter = 0;
            for (let times of this.timings) {
                if (seek >= times.start && seek <= times.end) {
                    index = counter;
                }
                counter += 1;
            }
            if (index === -1) {
                return;
            }
            const progressWidth = '0%'; // Since the width is set later, this is necessary to hide weird UI
            const progressLeft = `${this.timings[index].start / duration * 100}%`;
            this.dispatchEvent(new UpdateProgressEvent({ bubbles: true, composed: true, detail: { width: progressWidth, left: progressLeft } }));
            this.dispatchEvent(new UpdatePlayerContextEvent({ seek }));
            this.dispatchEvent(new UpdateGrabbersContextEvent({ currentlyGrabbed: { index, 'type': 'start' } }));
        }
    }
};
PlaybackSeekable.styles = playbackSeekableStyle;
__decorate([
    state()
], PlaybackSeekable.prototype, "timings", void 0);
__decorate([
    query('#seekable')
], PlaybackSeekable.prototype, "seekable", void 0);
__decorate([
    consume({ context: seekableContext, subscribe: true }),
    state()
], PlaybackSeekable.prototype, "seekableCtx", void 0);
__decorate([
    consume({ context: playerContext, subscribe: true }),
    state()
], PlaybackSeekable.prototype, "playerCtx", void 0);
PlaybackSeekable = __decorate([
    customElement('playback-seekable')
], PlaybackSeekable);
export { PlaybackSeekable };
//# sourceMappingURL=playback-seekable.js.map