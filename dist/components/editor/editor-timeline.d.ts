import { LitElement, TemplateResult } from 'lit';
import './editor-playback';
import '../timeline/timeline-chapters';
import { CurrentlyGrabbed, RangeTimings } from '../../types';
export declare class EditorTimeline extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    private timelineInfo;
    constructor();
    render(): TemplateResult<1>;
    private fillTimeline;
}
declare global {
    interface HTMLElementTagNameMap {
        'editor-timeline': EditorTimeline;
    }
}
//# sourceMappingURL=editor-timeline.d.ts.map