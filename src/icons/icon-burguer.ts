import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { iconBurguerStyle } from '../styles/icon-burguer.style';

@customElement('icon-burguer')
export class IconBurguer extends LitElement {
  static override styles = iconBurguerStyle;

  @state()
  private hover: boolean = false;

  override render() {
    return html`
      <div class="icon-burguer" @mouseover="${() => this.hover = true}" @mouseleave="${() => this.hover = false}">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 1024.000000 1024.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" class="icon-burguer__content ${this.hover ? 'icon-burguer__hover' : ''}" stroke="none">
            <path d="M1141 8305 c-284 -62 -501 -332 -501 -625 0 -237 141 -464 351 -568 158 -78 -221 -72 4129 -72 4347 0 3973 -6 4130 71 208 103 350 333 350 569 0 236 -142 466 -350 569 -158 77 217 71 -4135 70 -3296 0 -3920 -3 -3974 -14z"/>
            <path d="M1141 5745 c-284 -62 -501 -332 -501 -625 0 -237 141 -464 351 -568 158 -78 -221 -72 4129 -72 4347 0 3973 -6 4130 71 208 103 350 333 350 569 0 236 -142 466 -350 569 -158 77 217 71 -4135 70 -3296 0 -3920 -3 -3974 -14z"/>
            <path d="M1141 3185 c-284 -62 -501 -332 -501 -625 0 -237 141 -464 351 -568 158 -78 -221 -72 4129 -72 4347 0 3973 -6 4130 71 208 103 350 333 350 569 0 236 -142 466 -350 569 -158 77 217 71 -4135 70 -3296 0 -3920 -3 -3974 -14z"/>
          </g>
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-burguer': IconBurguer;
  }
}






