import { LitElement } from 'lit';
import '../playback/playback-grabbers';
import '../playback/playback-snapshots';
import '../playback/playback-seekable';
import '../playback/playback-progress';
import { Progress, RangeTimings } from '../../types';
export declare class EditorPlayback extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
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