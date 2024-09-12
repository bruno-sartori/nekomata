import { LitElement } from 'lit';
import { ChapterRange } from '../../types';
export declare class TimelineChapters extends LitElement {
    static styles: import("lit").CSSResult;
    chapters: Array<ChapterRange>;
    private playerCtx;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'timeline-chapters': TimelineChapters;
    }
}
//# sourceMappingURL=timeline-chapters.d.ts.map