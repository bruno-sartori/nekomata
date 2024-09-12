import { LitElement } from 'lit';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import './components/editor/editor-timeline';
import { ChapterRange, CurrentlyGrabbed, FillTimeline, Progress, RangeTimings, SeekableStyle } from './types';
import { PlayerContext } from './@types/contexts';
export declare class Nekomata extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    currentlyGrabbed: CurrentlyGrabbed;
    files?: FileList;
    fillTimeline: FillTimeline;
    shouldShowGrabbers: boolean;
    seekableRect?: DOMRect;
    seekableStyle: SeekableStyle;
    progress: Progress;
    snapshots: Array<HTMLCanvasElement>;
    chapters: Array<ChapterRange>;
    playerCtx: PlayerContext;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nekomata-editor': Nekomata;
    }
}
//# sourceMappingURL=index.d.ts.map