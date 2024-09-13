var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { nekomataStyle } from './styles/nekomata.style';
import { provide } from '@lit/context';
import { initialGrabbersContext } from './contexts/grabbers-context';
import init, { add } from 'lib';
import './components/content/file-uploader';
import { contentContext } from './contexts/content-context';
import UpdateContentContextEvent from './events/update-content-context';
let Nekomata = class Nekomata extends LitElement {
    constructor() {
        super();
        this.contentCtx = initialGrabbersContext;
        init().then((res) => {
            console.log('AQUQIIII', res);
            const resp = add(1, 2);
            console.log(resp);
        });
        this.addEventListener(UpdateContentContextEvent.eventName, ((e) => {
            this.contentCtx = {
                ...this.contentCtx,
                ...e.detail
            };
        }));
    }
    render() {
        return html `
      <main class="nekomata-main">
        <file-uploader></file-uploader>
      </main>
    `;
    }
};
Nekomata.styles = nekomataStyle;
__decorate([
    provide({ context: contentContext })
], Nekomata.prototype, "contentCtx", void 0);
Nekomata = __decorate([
    customElement('nekomata-editor')
], Nekomata);
export { Nekomata };
//# sourceMappingURL=index.js.map