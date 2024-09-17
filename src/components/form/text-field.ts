import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { textFieldStyle } from '../../styles/text-field.style';

@customElement('text-field')
export class TextField extends LitElement {
  static override styles = textFieldStyle;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  @state()
  value: string = '';

  @property({ type: String })
  type: 'text' | 'password' | 'email' | 'time' | 'number' = 'text';

  @property({ type: String })
  step: '1' | '2' = '1';

  override render() {
    console.log('-------', this.value)
    return html`
      <div class="text-field" id="${this.id}">
        <label for="${this.id}" class="text-field__label text">${this.name}</label>
        <input 
          type="${this.type}" 
          id="${this.id}"
          .disabled="${this.disabled}"
          class="text-field__input text"
          step="${this.step}"
          placeholder="${this.placeholder}" 
          @input="${this.handleChange}" 
          .value="${this.value}"
        >
      </div>
    `;
  }

  handleChange(e: any) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { value: e.target.value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField;
  }
}
