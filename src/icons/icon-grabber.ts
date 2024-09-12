import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-grabber')
export class IconGrabber extends LitElement {

  override render() {
    return html`
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='10' height='14' viewBox='0 0 10 14' xmlSpace='preserve'>
        <path class='st0' d='M1 14L1 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C2 13.6 1.6 14 1 14zM5 14L5 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C6 13.6 5.6 14 5 14zM9 14L9 14c-0.6 0-1-0.4-1-1V1c0-0.6 0.4-1 1-1h0c0.6 0 1 0.4 1 1v12C10 13.6 9.6 14 9 14z'/>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-grabber': IconGrabber;
  }
}






