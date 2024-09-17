import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { textareaFieldStyle } from '../../styles/text-field.style';

@customElement('textarea-field')
export class TextareaField extends LitElement {
  static override styles = textareaFieldStyle;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Number })
  maxlength: number = 150;

  @property({ type: String })
  value: string = '';

  @property({ attribute: false })
  change: Function = () => {};

  constructor() {
    super();

    this.addEventListener('change', () => {
      this.change('teste');  
    });
  }

  override render() {
    return html`
      <div class="textarea-field" id="${this.id}">
        <label for="${this.id}" class="textarea-field__label text">${this.name}</label>
        <textarea 
          id="${this.id}"
          maxlength="${this.maxlength}"
          class="textarea-field__input text" 
          placeholder="${this.placeholder}" 
          @change="${{ handleEvent: (e: any) => this.change(e)}}" 
        >${this.value}</textarea>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'textarea-field': TextareaField;
  }
}
