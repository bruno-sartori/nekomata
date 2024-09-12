import { LitElement, TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorTimelineStyle } from '../../styles/editor-timeline.style';
import './editor-playback';
import '../timeline/timeline-chapters';
import { getTimeString, isFloat } from '../../utils/time';
import { ChapterRange, CurrentlyGrabbed, FillTimeline, Progress, RangeTimings, SeekableStyle } from '../../types';

@customElement('editor-timeline')
export class EditorTimeline extends LitElement {
  static override styles = editorTimelineStyle;

  @state()
  timings: Array<RangeTimings> = [];

  @state()
  currentlyGrabbed?: CurrentlyGrabbed;

  @state()
  fillTimeline: FillTimeline = {
    duration: 0,
    metric: 'hours',
    fill: false,
  };

  @state()
  videoDuration = 0;

  @state()
  shouldShowGrabbers = false;

  @state()
  seekableRect?: DOMRect;

  @state()
  seekableStyle: SeekableStyle = {
    backgroundImage: ''
  };

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  @state()
  chapters: Array<ChapterRange> = [];

  private timelineInfo: Array<TemplateResult> = [];

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("timeline")) {
      if (this.fillTimeline.fill) {
        this.handleFillTimeline(this.fillTimeline.duration, this.fillTimeline.metric);
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
              .videoDuration=${this.videoDuration}
            ></timeline-chapters>
            <editor-playback 
              .shouldShowGrabbers=${this.shouldShowGrabbers} 
              .videoDuration=${this.videoDuration} 
              .timings=${this.timings} 
              .currentlyGrabbed=${this.currentlyGrabbed}
              .seekableRect=${this.seekableRect}
              .seekableStyle=${this.seekableStyle}
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
