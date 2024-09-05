import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorTimelineStyle } from '../../styles/editor-timeline.style';
import './editor-playback';
import '../timeline/timeline-chapters';
import FillTimelineEvent from '../../events/fill-timeline';
import { getTimeString, isFloat } from '../../utils/time';
import { CurrentlyGrabbed, RangeTimings } from '../../types';

@customElement('editor-timeline')
export class EditorTimeline extends LitElement {
  static override styles = editorTimelineStyle;

  @property({ type: Array })
  timings: Array<RangeTimings> = [];

  @property({ type: Object })
  currentlyGrabbed?: CurrentlyGrabbed;

  private timelineInfo: Array<TemplateResult> = [];

  constructor() {
    super();

    this.addEventListener(FillTimelineEvent.eventName, ((e: FillTimelineEvent) => {
      const duration = e.detail.duration;
      const metric = e.detail.metric;
      this.fillTimeline(duration, metric);
    }) as EventListener);
  }

  override render() {
    return html`
      <div class="timeline">
        <div class="timeline__scroll">
          <div>
            <div class="timeline__info" id="timelineInfo">
              ${this.timelineInfo}
            </div>
            <timeline-chapters></timeline-chapters>
            <editor-playback .timings=${this.timings} .currentlyGrabbed=${this.currentlyGrabbed}></editor-playback>
          </div>
        </div>
      </div>
    `;
  }

  private fillTimeline(duration: number, metric: 'hours' | 'minutes') {
    for (let i = 0; i <= duration + 0.5; i = i + 0.5) {
      this.timelineInfo.push(html`
        <div class="timeline__time ${isFloat(i) ? 'timeline__time--half' : ''}">${getTimeString(i, metric)}</div>
      `);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-timeline': EditorTimeline;
  }
}
