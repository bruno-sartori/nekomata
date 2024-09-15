import { LitElement } from 'lit';
import { ContentContext } from './@types/contexts';
import './components/content/file-uploader';
export declare class Nekomata extends LitElement {
    static styles: import("lit").CSSResult[];
    contentCtx: ContentContext;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nekomata-main': Nekomata;
    }
}
//# sourceMappingURL=index.d.ts.map