


import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconAgeRatingStyle } from '../styles/icon-age-rating.style';
import { RatingSystemClassInd } from '../types';

@customElement('icon-age-rating')
export class IconAgeRating extends LitElement {
  static override styles = iconAgeRatingStyle;

  @property({ type: String })
  rating: RatingSystemClassInd = 'L';

  override render() {
    console.log(this.rating)

    const className = `icon-age-rating age-${this.rating} text`;

    return html`
      <div class="${className}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-age-rating': IconAgeRating;
  }
}






