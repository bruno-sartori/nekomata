


import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconAgeRatingClassIndStyle } from '../styles/icon-age-rating.style';
import { RatingSystemClassInd } from '../types';

@customElement('icon-age-rating-classind')
export class IconAgeRatingClassInd extends LitElement {
  static override styles = iconAgeRatingClassIndStyle;

  @property({ type: String })
  rating: RatingSystemClassInd = 'L';

  override render() {
    console.log(this.rating)

    const className = `icon-age-rating-classind age-${this.rating} text`;

    return html`
      <div class="${className}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'icon-age-rating-classind': IconAgeRatingClassInd;
  }
}
