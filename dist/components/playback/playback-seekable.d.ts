import { LitElement } from 'lit';
import { RangeTimings, SeekableStyle } from '../../types';
export declare class PlaybackSeekable extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    videoDuration: number;
    seekable?: HTMLDivElement;
    seekableStyle: SeekableStyle;
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