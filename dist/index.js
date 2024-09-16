var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { nekomataStyle } from './styles/nekomata.style';
import { provide } from '@lit/context';
import init, { add } from 'lib';
import { contentContext, initialContentContext } from './contexts/content-context';
import UpdateContentContextEvent from './events/update-content-context';
import './components/content/file-uploader';
import './icons/icon-burguer';
import './components/settings/settings-menu';
import ShowSettingsMenuEvent from './events/show-settings-menu';
import { initialSettingsContext, settingsContext } from './contexts/settings-context';
import UpdateSettingsContextEvent from './events/update-settings-context';
let Nekomata = class Nekomata extends LitElement {
    constructor() {
        super();
        this.contentCtx = initialContentContext;
        this.settingsCtx = initialSettingsContext;
        this.settingsVisible = false;
        init().then(() => {
            const resp = add(1, 2);
            console.log(resp);
        });
        this.addEventListener(UpdateSettingsContextEvent.eventName, ((e) => {
            this.settingsCtx = { ...e.detail };
        }));
        this.addEventListener(UpdateContentContextEvent.eventName, ((e) => {
            this.contentCtx = { ...e.detail };
        }));
        this.addEventListener(ShowSettingsMenuEvent.eventName, ((e) => {
            this.settingsVisible = e.detail.visible;
        }));
    }
    render() {
        return html `
      <main class="nekomata-main">
        <div class="nekomata-main__container">
          <icon-burguer @click=${() => { this.settingsVisible = true; }} style="position: absolute; left: 1rem; top: 1rem;"></icon-burguer>
          <settings-menu .active=${this.settingsVisible}></settings-menu>
          <file-uploader></file-uploader>
        </div>
      </main>
    `;
    }
};
Nekomata.styles = nekomataStyle;
__decorate([
    provide({ context: contentContext })
], Nekomata.prototype, "contentCtx", void 0);
__decorate([
    provide({ context: settingsContext })
], Nekomata.prototype, "settingsCtx", void 0);
__decorate([
    state()
], Nekomata.prototype, "settingsVisible", void 0);
Nekomata = __decorate([
    customElement('nekomata-main')
], Nekomata);
export { Nekomata };
//# sourceMappingURL=index.js.map