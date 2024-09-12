import { LitElement } from 'lit';
import { CurrentlyGrabbed, RangeTimings } from '../../types';
import '../../icons/icon-grabber';
export declare class PlaybackGrabbers extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    videoDuration: number;
    shouldShowGrabbers: boolean;
    seekableRect?: DOMRect;
    render(): import("lit-html").TemplateResult<1>;
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