import { LitElement } from 'lit';
import { Progress } from '../../types';
export declare class PlaybackProgress extends LitElement {
    static styles: import("lit").CSSResult;
    progress: Progress;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'playback-progress': PlaybackProgress;
    }
}
//# sourceMappingURL=playback-progress.d.ts.map