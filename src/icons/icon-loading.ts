import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { iconLoadingStyle } from '../styles/icon-loading.style';

@customElement('icon-loading')
export class IconLoading extends LitElement {
  static override styles = iconLoadingStyle;

  override render() {
    return html`
      <div class="icon-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-loading': IconLoading;
  }
}






