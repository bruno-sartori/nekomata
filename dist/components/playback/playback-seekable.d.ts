import { LitElement } from 'lit';
import { RangeTimings } from '../../types';
export declare class PlaybackSeekable extends LitElement {
    static styles: import("lit").CSSResult;
    private videoDuration;
    private backgroundImage;
    timings: Array<RangeTimings>;
    seekable?: HTMLDivElement;
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