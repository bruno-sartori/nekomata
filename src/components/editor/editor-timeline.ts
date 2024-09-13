import { LitElement, TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorTimelineStyle } from '../../styles/editor-timeline.style';
import './editor-playback';
import '../timeline/timeline-chapters';
import { getTimeString, isFloat } from '../../utils/time';
import { ChapterRange, Progress, RangeTimings } from '../../types';
import { consume } from '@lit/context';
import { initialTimelineContext, timelineContext } from '../../contexts/timeline-context';
import { TimelineContext } from '../../@types/contexts';

@customElement('editor-timeline')
export class EditorTimeline extends LitElement {
  static override styles = editorTimelineStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @consume({ context: timelineContext, subscribe: true })
  @state()
  private timelineCtx: TimelineContext = initialTimelineContext;

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  @state()
  chapters: Array<ChapterRange> = [];

  private timelineInfo: Array<TemplateResult> = [];

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('timelineCtx')) {
      const oldTimelineCtx = changedProperties.get('timelineCtx') as TimelineContext;

      if ((this.timelineCtx?.fill !== oldTimelineCtx?.fill) && this.timelineCtx.fill) {
        this.handleFillTimeline(this.timelineCtx.duration, this.timelineCtx.metric);
      }
    }
  }

  override render() {
    return html`
      <div class="timeline">
        <div class="timeline__scroll">
          <div>
            <div class="timeline__info" id="timelineInfo">
              ${this.timelineInfo}
            </div>
            <timeline-chapters 
              .chapters=${this.chapters}
            ></timeline-chapters>
            <editor-playback 
              .timings=${this.timings} 
              .progress=${this.progress}
              .snapshots=${this.snapshots}
              ></editor-playback>
          </div>
        </div>
      </div>
    `;
  }

  private handleFillTimeline(duration: number, metric: 'hours' | 'minutes') {
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
