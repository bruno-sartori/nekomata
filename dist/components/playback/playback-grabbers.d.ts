import { LitElement } from 'lit';
import { CurrentlyGrabbed, RangeTimings } from '../../types';
export declare class PlaybackGrabbers extends LitElement {
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    private videoDuration;
    private shouldShowGrabbers;
    private seekableRect?;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private addActiveSegments;
    private handleMouseMoveWhenGrabbed;
    private removePointerMoveEventListener;
    private removeMouseMoveEventListener;
    private handleGrabberMouseDown;
    private handleGrabberPointerDown;
}
declare global {
    interface HTMLElementTagNameMap {
        'playback-grabbers': PlaybackGrabbers;
    }
}
//# sourceMappingURL=playback-grabbers.d.ts.map