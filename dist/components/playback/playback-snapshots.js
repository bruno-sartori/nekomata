var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playbackSnapshotsStyle } from '../../styles/playback-snapshots.style';
let PlaybackSnapshots = class PlaybackSnapshots extends LitElement {
    constructor() {
        super();
    }
    render() {
        return html `
      <div id="snapshots" class="playback__snapshots"></div>
    `;
    }
};
PlaybackSnapshots.styles = playbackSnapshotsStyle;
PlaybackSnapshots = __decorate([
    customElement('playback-snapshots')
], PlaybackSnapshots);
export { PlaybackSnapshots };
//# sourceMappingURL=playback-snapshots.js.map