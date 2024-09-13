import { LitElement } from 'lit';
import { RangeTimings } from '../../types';
import '../../icons/icon-grabber';
export declare class PlaybackGrabbers extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    private playerCtx;
    private seekableCtx;
    private grabbersCtx;
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