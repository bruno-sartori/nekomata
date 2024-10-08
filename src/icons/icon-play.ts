import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iconPlayStyle } from '../styles/icon-play.style';

@customElement('icon-play')
export class IconPlay extends LitElement {
  static override styles = iconPlayStyle;

  override render() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24">
        <g>
          <path fill="none" d="M0 0h24v24H0z"/>
          <path
            class="icon-play"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z" 
          />
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-play': IconPlay;
  }
}






