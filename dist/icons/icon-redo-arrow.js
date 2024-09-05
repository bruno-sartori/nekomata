var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let IconRedoArrow = class IconRedoArrow extends LitElement {
    render() {
        return html `
      <svg width="30" height="30" viewBox="0 0 808 643" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_2)" filter="url(#filter0_dd_1_2)">
          <path d="M804 237.511L494.166 473.019V349.355C281.238 328.916 76.7899 410.382 4.00196 634.408C3.20147 346.226 240.583 182.937 494.166 127.772V2L804 237.511Z" fill="#90919C"/>
        </g>
        <defs>
          <filter id="filter0_dd_1_2" x="-6.10352e-05" y="0" width="808" height="642.408" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_1_2" result="effect2_dropShadow_1_2"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_2" result="shape"/>
          </filter>
          <clipPath id="clip0_1_2">
            <rect width="800" height="634.408" fill="white" transform="translate(3.99994)"/>
          </clipPath>
        </defs>
      </svg>
    `;
    }
};
IconRedoArrow = __decorate([
    customElement('icon-redo-arrow')
], IconRedoArrow);
export { IconRedoArrow };
//# sourceMappingURL=icon-redo-arrow.js.map