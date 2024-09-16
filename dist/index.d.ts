import { LitElement } from 'lit';
import { ContentContext, SettingsContext } from './@types/contexts';
import './components/content/file-uploader';
import './icons/icon-burguer';
import './components/settings/settings-menu';
export declare class Nekomata extends LitElement {
    static styles: import("lit").CSSResult[];
    contentCtx: ContentContext;
    settingsCtx: SettingsContext;
    settingsVisible: boolean;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nekomata-main': Nekomata;
    }
}
//# sourceMappingURL=index.d.ts.map