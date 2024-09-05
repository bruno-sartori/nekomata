var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let IconTrash = class IconTrash extends LitElement {
    render() {
        return html `
      <svg width="30" height="30" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M675 150H600V50C600 22.3875 577.613 0 550 0H250C222.387 0 200 22.3875 200 50V150H125C97.3875 150 75 172.387 75 200V250H725V200C725 172.387 702.613 150 675 150ZM300 150V100H500V150H300Z" fill="#90919C"/>
        <path d="M125 750.006C125 777.619 147.381 800 174.994 800H625.012C652.619 800 675 777.619 675 750.012V750.006V300H125V750.006ZM500 425C500 411.194 511.194 400 525 400C538.806 400 550 411.194 550 425V675C550 688.806 538.806 700 525 700C511.194 700 500 688.806 500 675V425ZM375 425C375 411.194 386.194 400 400 400C413.806 400 425 411.194 425 425V675C425 688.806 413.806 700 400 700C386.194 700 375 688.806 375 675V425ZM250 425C250 411.194 261.194 400 275 400C288.806 400 300 411.194 300 425V675C300 688.806 288.806 700 275 700C261.194 700 250 688.806 250 675V425Z" fill="#90919C"/>
      </svg>
    `;
    }
};
IconTrash = __decorate([
    customElement('icon-trash')
], IconTrash);
export { IconTrash };
//# sourceMappingURL=icon-trash.js.map