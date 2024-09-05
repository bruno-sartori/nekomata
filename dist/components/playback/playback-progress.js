var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playbackProgressStyle } from '../../styles/playback-progress.style';
import UpdateProgressEvent from '../../events/update-progress';
let PlaybackProgress = class PlaybackProgress extends LitElement {
    constructor() {
        super();
        this.width = '0%';
        this.left = '0%';
        this.addEventListener(UpdateProgressEvent.eventName, ((e) => {
            if (e.detail.width) {
                this.width = e.detail.width;
            }
            if (e.detail.left) {
                this.left = e.detail.left;
            }
        }));
    }
    render() {
        return html `
      <div class="playback__progress" id="progress" style="width: ${this.width}; left: ${this.left};"></div>
    `;
    }
};
PlaybackProgress.styles = playbackProgressStyle;
PlaybackProgress = __decorate([
    customElement('playback-progress')
], PlaybackProgress);
export { PlaybackProgress };
//# sourceMappingURL=playback-progress.js.map