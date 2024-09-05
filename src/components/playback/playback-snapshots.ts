import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playbackSnapshotsStyle } from '../../styles/playback-snapshots.style';

@customElement('playback-snapshots')
export class PlaybackSnapshots extends LitElement {
  static override styles = playbackSnapshotsStyle;

  constructor() {
    super();
  }

  override render() {
    return html`
      <div id="snapshots" class="playback__snapshots"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-snapshots': PlaybackSnapshots;
  }
}
