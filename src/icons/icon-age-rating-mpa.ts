


import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconAgeRatingMPAStyle } from '../styles/icon-age-rating.style';
import { RatingSystemMPA } from '../types';

@customElement('icon-age-rating-mpa')
export class IconAgeRatingMPA extends LitElement {
  static override styles = iconAgeRatingMPAStyle;

  @property({ type: String })
  rating: RatingSystemMPA = 'G';

  override render() {
    return html`
      <div class="icon-age-rating-mpa age-${this.rating} text">
        ${this.rating}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-age-rating-mpa': IconAgeRatingMPA;
  }
}
