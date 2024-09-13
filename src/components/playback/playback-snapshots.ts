import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { playbackSnapshotsStyle } from '../../styles/playback-snapshots.style';

@customElement('playback-snapshots')
export class PlaybackSnapshots extends LitElement {
  static override styles = playbackSnapshotsStyle;
  
  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  override render() {
    return html`
      <div id="snapshots" class="playback__snapshots">
        ${this.snapshots.map(snapshot => snapshot)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-snapshots': PlaybackSnapshots;
  }
}
