import { LitElement } from 'lit';
import { CurrentlyGrabbed, RangeTimings } from '../../types';
import './editor-sidebar';
import './editor-timeline';
import '../../icons/icon-plus';
import '../../icons/icon-redo-arrow';
import '../../icons/icon-save';
import '../../icons/icon-trash';
import '../../icons/icon-undo-arrow';
export declare class EditorToolbar extends LitElement {
    static styles: import("lit").CSSResult[];
    timings: Array<RangeTimings>;
    currentlyGrabbed?: CurrentlyGrabbed;
    private ranges;
    private selectedFile;
    private videoDuration;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    private saveRange;
    private exportJson;
}
declare global {
    interface HTMLElementTagNameMap {
        'editor-toolbar': EditorToolbar;
    }
}
//# sourceMappingURL=editor-toolbar.d.ts.map