import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { playbackProgressStyle } from '../../styles/playback-progress.style';
import { Progress } from '../../types';

@customElement('playback-progress')
export class PlaybackProgress extends LitElement {
  static override styles = playbackProgressStyle;

  @state()
  progress: Progress = {};

  override render() {
    return html`
      <div class="playback__progress" id="progress" style="width: ${this.progress.width}; left: ${this.progress.left};"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-progress': PlaybackProgress;
  }
}
