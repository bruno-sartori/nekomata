import { LitElement } from 'lit';
import { RangeTimings } from '../../types';
export declare class EditorVideo extends LitElement {
    static styles: import("lit").CSSResult;
    timings: Array<RangeTimings>;
    videoPlaying: boolean;
    videoSeekTime: number;
    videoSrc: string;
    video: HTMLVideoElement | undefined;
    constructor();
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
    private fillVideoInfo;
    private handleTogglePlayer;
    private handleTimeUpdate;
    private handleMediaLoaded;
    private capture;
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