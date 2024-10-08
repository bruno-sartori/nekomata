import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('icon-plus')
export class IconPlus extends LitElement {

  override render() {
    return html`
      <svg width="30" height="30" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3_17)">
          <path d="M799.999 323.698V476.302C799.999 487.789 790.691 497.111 779.189 497.111H497.112V779.188C497.112 790.692 487.79 799.998 476.303 799.998H323.7C312.219 799.998 302.89 790.69 302.89 779.188V497.111H20.8107C9.31374 497.111 0.00109863 487.789 0.00109863 476.302V323.698C0.00109863 312.208 9.31374 302.889 20.8107 302.889H302.89V20.8096C302.89 9.30806 312.216 0 323.7 0H476.303C487.79 0 497.112 9.30806 497.112 20.8096V302.889H779.189C790.693 302.889 799.999 312.208 799.999 323.698Z" fill="#90919C"/>
        </g>
        <defs>
          <clipPath id="clip0_3_17">
            <rect width="800" height="800" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-plus': IconPlus;
  }
}


