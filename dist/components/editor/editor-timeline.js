var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorTimelineStyle } from '../../styles/editor-timeline.style';
import './editor-playback';
import '../timeline/timeline-chapters';
import FillTimelineEvent from '../../events/fill-timeline';
import { getTimeString, isFloat } from '../../utils/time';
let EditorTimeline = class EditorTimeline extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.timelineInfo = [];
        this.addEventListener(FillTimelineEvent.eventName, ((e) => {
            const duration = e.detail.duration;
            const metric = e.detail.metric;
            this.fillTimeline(duration, metric);
        }));
    }
    render() {
        return html `
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
    fillTimeline(duration, metric) {
        for (let i = 0; i <= duration + 0.5; i = i + 0.5) {
            this.timelineInfo.push(html `
        <div class="timeline__time ${isFloat(i) ? 'timeline__time--half' : ''}">${getTimeString(i, metric)}</div>
      `);
        }
    }
};
EditorTimeline.styles = editorTimelineStyle;
__decorate([
    property({ type: Array })
], EditorTimeline.prototype, "timings", void 0);
__decorate([
    property({ type: Object })
], EditorTimeline.prototype, "currentlyGrabbed", void 0);
EditorTimeline = __decorate([
    customElement('editor-timeline')
], EditorTimeline);
export { EditorTimeline };
//# sourceMappingURL=editor-timeline.js.map