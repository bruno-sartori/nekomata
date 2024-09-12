import { LitElement, PropertyValues } from 'lit';
export declare class EditorVideo extends LitElement {
    static styles: import("lit").CSSResult;
    private timings;
    private video;
    private playerCtx;
    private shouldAddActiveSegments;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    private fillVideoInfo;
    private handleTogglePlayer;
    private handleTimeUpdate;
    private handleMediaLoaded;
    private createSnapshotList;
    private addActiveSegments;
    private handleLoadedMetadata;
}
declare global {
    interface HTMLElementTagNameMap {
        'editor-video': EditorVideo;
    }
}
//# sourceMappingURL=editor-video.d.ts.map