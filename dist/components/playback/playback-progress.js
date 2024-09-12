var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { playbackProgressStyle } from '../../styles/playback-progress.style';
let PlaybackProgress = class PlaybackProgress extends LitElement {
    constructor() {
        super(...arguments);
        this.progress = {};
    }
    render() {
        return html `
      <div class="playback__progress" id="progress" style="width: ${this.progress.width}; left: ${this.progress.left};"></div>
    `;
    }
};
PlaybackProgress.styles = playbackProgressStyle;
__decorate([
    state()
], PlaybackProgress.prototype, "progress", void 0);
PlaybackProgress = __decorate([
    customElement('playback-progress')
], PlaybackProgress);
export { PlaybackProgress };
//# sourceMappingURL=playback-progress.js.map