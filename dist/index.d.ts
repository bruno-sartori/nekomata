import { LitElement } from 'lit';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
export declare class Nekomata extends LitElement {
    static styles: import("lit").CSSResult;
    private timings;
    private currentlyGrabbed;
    videoPlaying: boolean;
    private videoSeekTime;
    private videoSrc;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nekomata-editor': Nekomata;
    }
}
//# sourceMappingURL=index.d.ts.map