

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iconCloseCircleStyle } from '../styles/icon-close-circle.style';

@customElement('icon-close-circle')
export class IconCloseCircle extends LitElement {
  static override styles = iconCloseCircleStyle;

  override render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-close-circle" width="30px" height="30px" viewBox="0 0 512 512">
        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z"/>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-close-circle': IconCloseCircle;
  }
}






