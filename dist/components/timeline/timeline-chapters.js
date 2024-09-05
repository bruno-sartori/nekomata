var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { timelineChaptersStyle } from '../../styles/timeline-chapters.style';
let TimelineChapters = class TimelineChapters extends LitElement {
    constructor() {
        super();
    }
    render() {
        return html `
      <div class="chapters" id="chapters"></div>
    `;
    }
};
TimelineChapters.styles = timelineChaptersStyle;
TimelineChapters = __decorate([
    customElement('timeline-chapters')
], TimelineChapters);
export { TimelineChapters };
//# sourceMappingURL=timeline-chapters.js.map