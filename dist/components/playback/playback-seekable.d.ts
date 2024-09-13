import { LitElement } from 'lit';
import { RangeTimings } from '../../types';
export declare class PlaybackSeekable extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    seekable?: HTMLDivElement;
    private seekableCtx;
    private playerCtx;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private updateProgress;
}
declare global {
    interface HTMLElementTagNameMap {
        'playback-seekable': PlaybackSeekable;
    }
}
//# sourceMappingURL=playback-seekable.d.ts.map