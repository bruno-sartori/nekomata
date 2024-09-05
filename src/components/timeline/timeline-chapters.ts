import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { timelineChaptersStyle } from '../../styles/timeline-chapters.style';

@customElement('timeline-chapters')
export class TimelineChapters extends LitElement {
  static override styles = timelineChaptersStyle;

  constructor() {
    super();
  }

  override render() {
    return html`
      <div class="chapters" id="chapters"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'timeline-chapters': TimelineChapters;
  }
}
