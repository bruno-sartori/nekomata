import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playbackProgressStyle } from '../../styles/playback-progress.style';
import UpdateProgressEvent from '../../events/update-progress';

@customElement('playback-progress')
export class PlaybackProgress extends LitElement {
  static override styles = playbackProgressStyle;

  private width = '0%';
  private left = '0%';

  constructor() {
    super();

    this.addEventListener(UpdateProgressEvent.eventName, ((e: UpdateProgressEvent) => {
      if (e.detail.width) {
        this.width = e.detail.width;
      }
      if (e.detail.left) {
        this.left = e.detail.left;
      }
    }) as EventListener);
  }

  override render() {
    return html`
      <div class="playback__progress" id="progress" style="width: ${this.width}; left: ${this.left};"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'playback-progress': PlaybackProgress;
  }
}
