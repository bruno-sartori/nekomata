import { LitElement } from 'lit';
export declare class VideoUploader extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    private onClick;
    private onDragEnter;
    private onDragOver;
    private onDrop;
    private onSelectFile;
}
declare global {
    interface HTMLElementTagNameMap {
        'video-uploader': VideoUploader;
    }
}
//# sourceMappingURL=video-uploader.d.ts.map