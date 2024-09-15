

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iconCloseStyle } from '../styles/icon-close.style';

@customElement('icon-close')
export class IconClose extends LitElement {
  static override styles = iconCloseStyle;

  override render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="10px" height="10px" viewBox="0 0 600.000000 600.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)" class="icon-close" stroke="none">
          <path d="M850 5515 c-110 -31 -199 -107 -248 -213 -24 -50 -27 -70 -27 -157 0 -176 -70 -91 1000 -1209 l936 -977 -103 -108 c-57 -59 -476 -497 -933 -974 -953 -995 -900 -930 -900 -1101 0 -90 3 -108 28 -161 37 -79 114 -156 191 -192 54 -25 72 -28 161 -28 89 1 106 4 160 29 73 35 8 -30 1075 1085 l855 893 79 -83 c44 -46 462 -483 929 -972 979 -1022 899 -952 1082 -952 93 0 105 2 166 32 80 40 150 111 186 190 50 109 39 263 -25 360 -15 22 -443 476 -952 1007 -509 532 -925 970 -925 975 0 4 419 444 930 979 1032 1078 991 1029 1002 1174 13 176 -87 333 -251 394 -36 13 -77 19 -136 19 -74 0 -93 -4 -152 -32 -40 -19 -88 -53 -121 -85 -29 -29 -448 -466 -931 -970 -483 -505 -881 -918 -884 -917 -4 0 -416 429 -917 953 -500 524 -931 968 -956 985 -91 64 -214 85 -319 56z"/>
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-close': IconClose;
  }
}






