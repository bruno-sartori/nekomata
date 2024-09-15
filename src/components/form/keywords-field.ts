import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { keywordsFieldStyle } from '../../styles/text-field.style';
import '../../icons/icon-close';

@customElement('keywords-field')
export class KeywordsField extends LitElement {
  static override styles = keywordsFieldStyle;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: String })
  value: string = '';

  @property({ type: String })
  type: 'text' | 'password' | 'email' = 'text';

  @property({ attribute: false })
  change: Function = () => {};

  @query('.keywords-field__input')
  input!: HTMLInputElement;

  @state()
  private items: string[] = [];

  @state()
  shouldShowPlaceholder: boolean = true;

  constructor() {
    super();

    this.addEventListener('change', () => {
      this.change('teste');  
    });
  }

  override render() {
    return html`
      <div class="keywords-field" id="${this.id}">
        <label for="${this.id}" class="keywords-field__label text">${this.name}</label>
        <div 
          class="multi-search-filter" 
          style="${this.items.length > 0 ? 'padding: 0.75rem;' : ''}" 
          @click="${() => this.input.focus()}"
        >
          ${this.shouldShowPlaceholder ? html`<span class="multi-search-item__placeholder text">${this.placeholder}</span>` : ''}
          ${this.items.map((item, i) => html`
            <div class="multi-search-item text">
              <span>${item}</span>
              <div class="multi-search-item__close" @click="${() => this.removeItem(i)}">
                <icon-close></icon-close>
              </div>
            </div>
          `)}
          <input 
            type="${this.type}" 
            id="${this.id}" 
            class="keywords-field__input text"
            @keyup=${this.multiSearchKeyup}
            @change="${{ handleEvent: (e: any) => this.change(e)}}"
            @blur="${this.handleBlur}"
            value="${this.value}"
          >
        </div>
      </div>
    `;
  }

  private handleBlur() {
    if (this.input.value !== '') {
      this.items.push(this.input.value);
      this.input.value = '';
      this.requestUpdate();
    }

    if (this.items.length === 0) {
      this.shouldShowPlaceholder = true;
    }
  } 

  private removeItem(index: number) {
    this.items.splice(index, 1);
    this.requestUpdate();
  }
  
  private multiSearchKeyup(event: KeyboardEvent) {
    this.shouldShowPlaceholder = false;
    if(event.key === 'Enter' || event.code === 'Space') {
      this.items.push(this.input.value);
      this.input.value = '';
      this.requestUpdate();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'keywords-field': KeywordsField;
  }
}
