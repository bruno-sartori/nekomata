import { LitElement } from 'lit';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
import { CurrentlyGrabbed, Progress, RangeTimings, SeekableStyle } from '../../types';
export declare class EditorPlayback extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    videoDuration: number;
    shouldShowGrabbers: boolean;
    seekableRect?: DOMRect;
    seekableStyle: SeekableStyle;
    progress: Progress;
    snapshots: Array<HTMLCanvasElement>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'editor-playback': EditorPlayback;
    }
}
//# sourceMappingURL=editor-playback.d.ts.map