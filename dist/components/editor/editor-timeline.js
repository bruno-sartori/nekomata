var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { editorTimelineStyle } from '../../styles/editor-timeline.style';
import './editor-playback';
import '../timeline/timeline-chapters';
import { getTimeString, isFloat } from '../../utils/time';
import { consume } from '@lit/context';
import { initialTimelineContext, timelineContext } from '../../contexts/timeline-context';
let EditorTimeline = class EditorTimeline extends LitElement {
    constructor() {
        super(...arguments);
        this.timings = [];
        this.timelineCtx = initialTimelineContext;
        this.progress = {};
        this.snapshots = [];
        this.chapters = [];
        this.timelineInfo = [];
    }
    updated(changedProperties) {
        if (changedProperties.has('timelineCtx')) {
            const oldTimelineCtx = changedProperties.get('timelineCtx');
            if ((this.timelineCtx?.fill !== oldTimelineCtx?.fill) && this.timelineCtx.fill) {
                this.handleFillTimeline(this.timelineCtx.duration, this.timelineCtx.metric);
            }
        }
    }
    render() {
        return html `
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
    handleFillTimeline(duration, metric) {
        for (let i = 0; i <= duration + 0.5; i = i + 0.5) {
            this.timelineInfo.push(html `
        <div class="timeline__time ${isFloat(i) ? 'timeline__time--half' : ''}">${getTimeString(i, metric)}</div>
      `);
        }
    }
};
EditorTimeline.styles = editorTimelineStyle;
__decorate([
    state()
], EditorTimeline.prototype, "timings", void 0);
__decorate([
    consume({ context: timelineContext, subscribe: true }),
    state()
], EditorTimeline.prototype, "timelineCtx", void 0);
__decorate([
    state()
], EditorTimeline.prototype, "progress", void 0);
__decorate([
    state()
], EditorTimeline.prototype, "snapshots", void 0);
__decorate([
    state()
], EditorTimeline.prototype, "chapters", void 0);
EditorTimeline = __decorate([
    customElement('editor-timeline')
], EditorTimeline);
export { EditorTimeline };
//# sourceMappingURL=editor-timeline.js.map