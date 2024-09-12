import { LitElement } from 'lit';
export declare class PlaybackSnapshots extends LitElement {
    static styles: import("lit").CSSResult;
    snapshots: Array<HTMLCanvasElement>;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'playback-snapshots': PlaybackSnapshots;
    }
}
//# sourceMappingURL=playback-snapshots.d.ts.map