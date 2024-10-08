import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-undo-arrow')
export class IconUndoArrow extends LitElement {

  override render() {
    return html`
      <svg width="30" height="30" viewBox="0 0 808 643" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_2)" filter="url(#filter0_dd_1_2)">
          <path d="M3.99992 237.511L313.833 473.019V349.355C526.762 328.916 731.21 410.382 803.998 634.408C804.798 346.226 567.416 182.937 313.833 127.772V2L3.99992 237.511Z" fill="#90919C"/>
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
            <rect width="800" height="634.408" fill="white" transform="matrix(-1 0 0 1 804 0)"/>
            </clipPath>
        </defs>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-undo-arrow': IconUndoArrow;
  }
}


