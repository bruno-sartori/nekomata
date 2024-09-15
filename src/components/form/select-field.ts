import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { selectFieldStyle } from '../../styles/text-field.style';
import '../../icons/icon-arrow-down';
import '../../icons/icon-age-rating';
import { RatingSystemClassInd } from '../../types';
import { isUndefined } from '../../utils/isValidVariable';


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
  private value?: { value: RatingSystemClassInd, label: string } = undefined;

  @query('.select-field__input')
  input!: HTMLInputElement;

  @state()
  active: boolean = false;

  @state()
  shouldShowPlaceholder: boolean = true;

  override render() {
    console.log('-------', this.value)
    return html`
      <div class="select-field" id="${this.id}">
        <label for="${this.id}" class="select-field__label text">${this.name}</label>
        <div class="select-field__container">
          <div class="select-field__container2" @click="${() => this.input.focus()}">
            ${this.shouldShowPlaceholder ? html`
              <span class="select-field__placeholder text">${this.placeholder}</span>
            ` : ''}
            ${!isUndefined(this.value?.value) ? html`
              <div class="select-field__value text">
                <icon-age-rating .rating="${this.value?.value as RatingSystemClassInd}">${this.value?.value}</icon-age-rating> ${this.value?.label}
              </div>
            ` : ''}
            <input 
              id="${this.id}"
              .disabled="${this.disabled}"
              class="select-field__input text"
              @input="${this.handleChange}"
              @blur="${this.handleBlur}"
              @focus="${() => this.active = true}"
            >
            <div class="select-field__icon">
              <icon-arrow-down></icon-arrow-down>
            </div>
          </div>
          <div class="select-field__list ${this.active ? 'active' : ''}">
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: 'ER', label: 'Especialmente recomendado para crianças' })}><icon-age-rating rating="ER">ER</icon-age-rating> Especialmente recomendado para crianças</div> 
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: 'L', label: 'Livre' })}><icon-age-rating rating="L">L</icon-age-rating> Livre</div> 
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: '10', label: '+10' })}><icon-age-rating rating="10">10</icon-age-rating> +10</div>
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: '12', label: '+12' })}><icon-age-rating rating="12">12</icon-age-rating> +12</div>
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: '14', label: '+14' })}><icon-age-rating rating="14">14</icon-age-rating> +14</div>
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: '16', label: '+16' })}><icon-age-rating rating="16">16</icon-age-rating> +16</div>
            <div class="select-field__option text" @click=${() => this.handleSelectOption({ value: '18', label: '+18' })}><icon-age-rating rating="18">18</icon-age-rating> +18</div>
          </div>  
        </div>
      </div>
    `;
  }

  private handleBlur() {
    if (isUndefined(this.value?.value)) {
      this.shouldShowPlaceholder = true;
    }
  } 

  handleSelectOption(option: { value: RatingSystemClassInd, label: string }) {
    this.value = option;
    this.active = false;
    this.shouldShowPlaceholder = false;
  }

  handleChange(e: any) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, detail: { value: e.target.value } }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'select-field': SelectField;
  }
}
