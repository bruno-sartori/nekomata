import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, state, query, queryAssignedElements } from 'lit/decorators.js';
import { selectFieldStyle } from '../../styles/text-field.style';
import '../../icons/icon-arrow-down';
import { isValidString } from '../../utils/isValidVariable';

@customElement('select-field')
export class SelectField extends LitElement {
  static override styles = selectFieldStyle;

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  @state()
  value: string = '';

  @query('.select-field__input')
  input!: HTMLInputElement;

  @state()
  active: boolean = false;

  @state()
  shouldShowPlaceholder: boolean = true;

  @state()
  private focusedElement: string = '';

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener('click', (e: Event) => {
      this.focusedElement = (e.target as Element).localName;
    });

    return root;
  }

  @queryAssignedElements({slot: 'list', selector: '.option'})
  optionList!: Array<HTMLElement>;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this.handleChangeEvent as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('change', this.handleChangeEvent as EventListener);
  }

  /**
   * Updates the state of the component to show the default selected value
   */
  protected override firstUpdated(_changedProperties: PropertyValues): void {
    if (this.optionList.length > 0 && isValidString(this.value)) {
      this.shouldShowPlaceholder = false;
      this.requestUpdate();
    }
  }

  protected override updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('value')) {
      const oldValue = _changedProperties.get('value') as string;

      if (isValidString(oldValue) && !isValidString(this.value)) {
        this.shouldShowPlaceholder = true;
        this.requestUpdate();
      } else if (!isValidString(oldValue) && isValidString(this.value)) {
        this.shouldShowPlaceholder = false;
        this.requestUpdate();
      }
    }
  }

  override render() {
    return html`
      <div class="select-field" id="${this.id}">
        <label for="${this.id}" class="select-field__label text">${this.name}</label>
        <div class="select-field__container">
          <div class="select-field__container2" @click="${() => this.input.focus()}">
            ${this.shouldShowPlaceholder ? html`
              <span class="select-field__placeholder text">${this.placeholder}</span>
            ` : ''}
            ${isValidString(this.value) ? html`
              <div class="select-field__value text">
                ${this.findItemWithValue()}
              </div>
            ` : ''}
            <input 
              id="${this.id}"
              .disabled="${this.disabled}"
              class="select-field__input text"
              @blur="${this.handleBlur}"
              @focus="${() => this.active = true}"
            >
            <div class="select-field__icon">
              <icon-arrow-down></icon-arrow-down>
            </div>
          </div>
          <div class="select-field__list ${this.active ? 'active' : ''}">
            <slot name="list"></slot>
          </div>  
        </div>
      </div>
    `;
  }

  private handleBlur() {
    if (!isValidString(this.value)) {
      this.shouldShowPlaceholder = true;
    }

    setTimeout(() => {
      if (this.focusedElement !== 'select-option') {
        this.active = false;
      }
    }, 200);
  }

  private findItemWithValue() {
    const item = this.optionList.find((el: any) => el.value === this.value);
    const nodes = [];

    for (let i = 0, len = item?.childNodes.length || 0; i < len; i++) {
      const node = item?.childNodes[i].cloneNode(true);
      nodes.push(node);
    }
    return nodes;
  }

  private handleChangeEvent(event: CustomEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const target = event.target as HTMLElement;
    
    if (this.optionList.includes(target)) {
      const value = event.detail?.value;
      this.active = false;
      this.shouldShowPlaceholder = false;
      this.value = value;
      this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { value } }));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'select-field': SelectField;
  }
}
