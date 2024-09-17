import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonPrimaryStyle } from '../../styles/button.style';

@customElement('button-primary')
export class ButtonPrimary extends LitElement {
  static override styles = buttonPrimaryStyle;

  @property({ type: String })
  name: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  override render() {
    return html`
      <button type="button" class="button-primary text" @click=${this.handleClick}>${this.name}</button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'button-primary': ButtonPrimary;
  }
}
