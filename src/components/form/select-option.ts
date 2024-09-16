import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { selectOptionStyle } from '../../styles/text-field.style';

@customElement('select-option')
export class SelectOption extends LitElement {
  static override styles = selectOptionStyle;

  @property({ type: String })
  value: string = '';

  override render() {
    return html`
      <div class="select-field__option text" @click=${() => this.handleSelectOption(this.value)}>
        <slot></slot>
      </div> 
    `;
  }

  handleSelectOption(value: string) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'select-option': SelectOption;
  }
}
