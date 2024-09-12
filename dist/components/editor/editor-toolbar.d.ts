import { LitElement } from 'lit';
import { RangeTimings } from '../../types';
import '../../icons/icon-plus';
import '../../icons/icon-redo-arrow';
import '../../icons/icon-save';
import '../../icons/icon-trash';
import '../../icons/icon-undo-arrow';
export declare class EditorToolbar extends LitElement {
    static styles: import("lit").CSSResult[];
    timings: Array<RangeTimings>;
    files?: FileList;
    private ranges;
    private selectedFile;
    updated(changedProperties: Map<string, unknown>): void;
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