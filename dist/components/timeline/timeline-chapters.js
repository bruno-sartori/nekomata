var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { timelineChaptersStyle } from '../../styles/timeline-chapters.style';
import { consume } from '@lit/context';
import { playerContext } from '../../contexts/player-context';
let TimelineChapters = class TimelineChapters extends LitElement {
    constructor() {
        super(...arguments);
        this.chapters = [];
        this.playerCtx = {
            playing: false,
            seek: 0,
            src: '',
            video: undefined
        };
    }
    render() {
        return html `
      <div class="chapters" id="chapters">
        ${this.chapters.map((chapter) => {
            const sizeRange = [
                chapter.range.start / (this.playerCtx.video?.duration ?? 1) * 100,
                chapter.range.end / (this.playerCtx.video?.duration ?? 1) * 100
            ];
            return html `
            <div 
              class="chapters__chapter" 
              style="left: ${sizeRange[0]}%; width: ${sizeRange[1] - sizeRange[0]}%;"
            >
              ${chapter.title}
            </div>
          `;
        })}
      </div>
    `;
    }
};
TimelineChapters.styles = timelineChaptersStyle;
__decorate([
    state()
], TimelineChapters.prototype, "chapters", void 0);
__decorate([
    consume({ context: playerContext, subscribe: true }),
    state()
], TimelineChapters.prototype, "playerCtx", void 0);
TimelineChapters = __decorate([
    customElement('timeline-chapters')
], TimelineChapters);
export { TimelineChapters };
//# sourceMappingURL=timeline-chapters.js.map