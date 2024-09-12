import { LitElement, TemplateResult } from 'lit';
import './editor-playback';
import '../timeline/timeline-chapters';
import { ChapterRange, CurrentlyGrabbed, FillTimeline, Progress, RangeTimings, SeekableStyle } from '../../types';
export declare class EditorTimeline extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    fillTimeline: FillTimeline;
    videoDuration: number;
    shouldShowGrabbers: boolean;
    seekableRect?: DOMRect;
    seekableStyle: SeekableStyle;
    progress: Progress;
    snapshots: Array<HTMLCanvasElement>;
    chapters: Array<ChapterRange>;
    private timelineInfo;
    updated(changedProperties: Map<string, unknown>): void;
    render(): TemplateResult<1>;
    private handleFillTimeline;
}
declare global {
    interface HTMLElementTagNameMap {
        'editor-timeline': EditorTimeline;
    }
}
//# sourceMappingURL=editor-timeline.d.ts.map