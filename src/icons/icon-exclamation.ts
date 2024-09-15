import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iconExclamationStyle } from '../styles/icon-exclamation.style';

@customElement('icon-exclamation')
export class IconExclamation extends LitElement {
  static override styles = iconExclamationStyle;

  override render() {
    return html`
      <svg style="padding: 2px;" xmlns="http://www.w3.org/2000/svg" version="1.0" width="26px" height="26px" viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,1200.000000) scale(0.100000,-0.100000)" class="icon-exclamation" stroke="none">
          <path d="M5640 11989 c-1663 -103 -3190 -876 -4253 -2153 -1315 -1578 -1728 -3726 -1095 -5685 699 -2163 2576 -3752 4823 -4085 1376 -204 2790 77 3970 787 1240 747 2176 1922 2620 3287 637 1963 225 4115 -1092 5696 -933 1120 -2228 1858 -3664 2088 -414 67 -900 91 -1309 65z m565 -3023 c252 -81 428 -292 466 -558 11 -79 5 -147 -125 -1453 -85 -851 -143 -1389 -153 -1420 -46 -148 -180 -263 -331 -283 -205 -28 -395 90 -455 283 -10 31 -68 569 -153 1420 -130 1306 -136 1374 -125 1453 41 291 246 512 535 578 91 21 242 12 341 -20z m-10 -4491 c250 -68 447 -261 527 -515 20 -64 23 -95 22 -215 0 -124 -3 -149 -27 -220 -110 -329 -420 -543 -757 -522 -201 13 -345 80 -491 227 -71 71 -94 103 -133 181 -64 130 -80 199 -80 339 0 139 16 209 79 336 105 214 317 369 560 408 56 9 240 -3 300 -19z"/>
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-exclamation': IconExclamation;
  }
}






