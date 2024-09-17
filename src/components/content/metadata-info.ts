import { LitElement, PropertyValues, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { metadataInfoStyle } from '../../styles/metadata-info.style';
import ShowMetadataEvent from '../../events/show-metadata';
import { ContentMetadata, FileContentType } from '../../types';
import { secondsToHHMMSS } from '../../utils/time';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext, SettingsContext } from '../../@types/contexts';
import { formatTitle, identifyContentType } from '../../utils/metadata';
import '../../icons/icon-close-circle';
import '../form/text-field';
import '../form/textarea-field';
import '../form/keywords-field';
import '../form/select-field';
import '../form/select-option';
import '../../icons/icon-age-rating-classind';
import '../../icons/icon-age-rating-mpa';
import '../form/button-primary';
import { initialSettingsContext, settingsContext } from '../../contexts/settings-context';
import { localized, msg } from '@lit/localize';

@localized()
@customElement('metadata-info')
export class MetadataInfoBar extends LitElement { 
  static override styles = metadataInfoStyle;

  @state()
  active: boolean = false;

  @state()
  index: number = -1;

  @query('.metadata-info__container')
  scrollContainer!: HTMLElement;

  @consume({ context: contentContext, subscribe: true })
  @state()
  contentCtx: ContentContext = initialContentContext;

  @consume({ context: settingsContext, subscribe: true })
  @state()
  settingsCtx: SettingsContext = initialSettingsContext;

  @state()
  metadata?: ContentMetadata = undefined;

  @state()
  predictedContentType: FileContentType = { 
    contentType: 'MOVIE', 
    series: { seriesTitle: '', seasonNumber: 1, episodeNumber: 1 } 
  };

  protected override updated(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('index')) {
      const oldIndex = _changedProperties.get('index') as number;
      if (oldIndex !== this.index) {
        this.requestUpdate();
      }
    }

    if (_changedProperties.has('metadata')) {
      const oldMetadata = _changedProperties.get('metadata') as ContentMetadata;

      if (oldMetadata?.fileInfo?.format?.filename !== this.metadata?.fileInfo?.format?.filename) {
        this.predictedContentType = identifyContentType(this.metadata?.fileInfo?.format?.filename || '');
        if (this.predictedContentType.contentType === 'SERIES') {
          console.log(this.metadata?.fileInfo);
          this.metadata!.contentType = 'SERIES';
          this.metadata!.series = { 
            seriesTitle: this.predictedContentType.series!.seriesTitle, 
            seasonNumber: this.predictedContentType.series!.seasonNumber, 
            episodeNumber: this.predictedContentType.series!.episodeNumber 
          };
          
          this.getOMDBData();
          this.getTMDBData('SERIES');
        }

        this.requestUpdate();
      }
    }
  }

  override render() {
    return html`
      <div @click=${this.hideMetadata} class="metadata-info ${this.active ? 'active' : ''}">
        <div @click=${(e: Event) => { e.preventDefault(); e.stopPropagation();}} class="metadata-info__container ${this.active ? 'active' : ''}">
          <div class="metadata-info__container-scroll">
            <button class="metadata-info__close" @click=${this.hideMetadata}>
              <icon-close-circle> </icon-close-circle>
            </button>
            <h1 class="metadata-info__title text">${msg('Content Metadata')}</h1>
            <p class="metadata-info__description text">${msg('Add cast, author, number of series and episodes and more.')}</p>
            <form class="metadata-info__form">
              <text-field 
                name="${msg('Title')}" 
                placeholder="${msg('Enter title')}"
                type="text"
                .value=${formatTitle(this.metadata?.fileInfo?.format?.filename || '')}
                id="title"
                @change=${(e: any) => { this.metadata!.title = e.detail.value; }}
              ></text-field>
              <textarea-field
                name="${msg('Description')}" 
                placeholder="${msg('Enter a description')}"
                value=""
                maxlength="800"
                id="description"
                @change=${(e: any) => console.log(e.target.value)}
              ></textarea-field>
              <select-field 
                name="${msg('Age Rating')}"
                id="age-rating"
                placeholder="${msg('Select an age rating')}"
                .value=${this.metadata?.ageRating as string || ''}
                @change=${(e: any) => {this.metadata!.ageRating = e.detail.value }}
              >
                ${this.settingsCtx.ratingSystem === 'ClassInd' ? html`
                  <select-option slot="list" class="option" value="ER">
                    <icon-age-rating-classind rating="ER">ER</icon-age-rating-classind> ${msg('Especialmente recomendado para crianças')}
                  </select-option>
                  <select-option slot="list" class="option" value="L">
                    <icon-age-rating-classind rating="L">L</icon-age-rating-classind> ${msg('Livre')}
                  </select-option>
                  <select-option slot="list" class="option" value="10">
                    <icon-age-rating-classind rating="10">10</icon-age-rating-classind> +10
                  </select-option>
                  <select-option slot="list" class="option" value="12">
                    <icon-age-rating-classind rating="12">12</icon-age-rating-classind> +12
                  </select-option>
                  <select-option slot="list" class="option" value="14">
                    <icon-age-rating-classind rating="14">14</icon-age-rating-classind> +14
                  </select-option>
                  <select-option slot="list" class="option" value="16">
                    <icon-age-rating-classind rating="16">16</icon-age-rating-classind> +16
                  </select-option>
                  <select-option slot="list" class="option" value="18">
                    <icon-age-rating-classind rating="18">18</icon-age-rating-classind> +18
                  </select-option> 
                ` : html`
                  <select-option slot="list" class="option" value="G">
                    <icon-age-rating-mpa rating="G"></icon-age-rating-mpa> ${msg('General Audiences')}
                  </select-option>
                  <select-option slot="list" class="option" value="PG">
                    <icon-age-rating-mpa rating="PG"></icon-age-rating-mpa> ${msg('Parental Guidance Suggested')}
                  </select-option>
                  <select-option slot="list" class="option" value="PG-13">
                    <icon-age-rating-mpa rating="PG-13"></icon-age-rating-mpa> ${msg('Parents Strongly Cautioned')}
                  </select-option>
                  <select-option slot="list" class="option" value="R">
                    <icon-age-rating-mpa rating="R"></icon-age-rating-mpa> ${msg('Restricted')}
                  </select-option>
                  <select-option slot="list" class="option" value="NC-17">
                    <icon-age-rating-mpa rating="NC-17"></icon-age-rating-mpa> ${msg('Adults Only')}
                  </select-option>
                  
                `}
              </select-field>
              <select-field 
                name="${msg('Content Type')}"
                id="content-type"
                placeholder="${msg('Select a content type')}"
                .value=${this.predictedContentType.contentType as string || ''}
                @change=${(e: any) => {
                  this.metadata!.contentType = e.detail.value;
                  if (e.detail.value === 'SERIES') {
                    this.metadata!.series = { seriesTitle: '', seasonNumber: 1, episodeNumber: 1 };
                  }
                  this.requestUpdate();
                }}
              >
                <select-option slot="list" class="option" value="MOVIE">
                  ${msg('Movie')}
                </select-option>
                <select-option slot="list" class="option" value="SERIES">
                  ${msg('Series')}
                </select-option>
              </select-field>

              ${this.metadata?.contentType === 'SERIES' ? html`
                  <text-field 
                    name="${msg('Series Title')}" 
                    placeholder="${msg('Enter a series title')}"
                    type="text"
                    .value=${formatTitle(this.predictedContentType.series?.seriesTitle || '')}
                    id="series-title"
                    @change=${(e: any) => { this.metadata!.series!.seriesTitle = e.detail.value; }}
                  ></text-field>
                  <text-field 
                    name="${msg('Season Number')}" 
                    placeholder="${msg('Enter a season number')}"
                    type="number"
                    .value=${this.predictedContentType.series?.seasonNumber.toString() || '1'}
                    id="series-season-number"
                    @change=${(e: any) => { this.metadata!.series!.seasonNumber = e.detail.value; }}
                  ></text-field>
                  <text-field 
                    name="${msg('Episode Number')}" 
                    placeholder="${msg('Enter a episode number')}"
                    type="number"
                    .value=${this.predictedContentType.series?.episodeNumber.toString() || '1'}
                    id="series-episode-number"
                    @change=${(e: any) => { this.metadata!.series!.episodeNumber = e.detail.value; }}
                  ></text-field>
              ` : ''}

              <text-field 
                name="${msg('Director')}" 
                placeholder="${msg('Enter director name')}"
                type="text"
                value=""
                id="director"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>
              <text-field 
                name="${msg('Cast')}" 
                placeholder="${msg('Enter cast name separated by comma')}"
                type="text"
                value=""
                id="cast"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>
              <keywords-field 
                name="${msg('Keywords')}" 
                placeholder="${msg('Enter keywords separated by space')}"
                value=""
                id="keywords"
                @change=${(e: any) => console.log(e.target.value)}
              ></keywords-field>
              <keywords-field 
                name="${msg('Genres')}" 
                placeholder="${msg('Enter genres separated by space')}"
                value=""
                id="genres"
                @change=${(e: any) => console.log(e.target.value)}
              ></keywords-field>
              
              <text-field 
                name="${msg('Duration')}"
                disabled
                placeholder="${msg('Enter a duration in seconds')}"
                type="time"
                step="2"
                .value=${secondsToHHMMSS(parseFloat(this.metadata?.fileInfo?.format?.duration || '0')) || '00:00:00'}
                id="duration"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>

              <button-primary name="${msg('Save')}" @click=${this.handleSave}></button-primary>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  private async getOMDBData() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=4a3b711b&plot=full&r=json&t=${this.metadata?.series?.seriesTitle}`);
    const data = await response.json();
    console.log(data);
    // @ts-ignore
    console.log(process.env.OMDB_API_KEY);
  }

  private async getTMDBData(contentType: 'MOVIE' | 'SERIES') {
    const type = contentType === 'MOVIE' ? 'movie' : 'tv';
    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=6bfe9475518926af9383380b9930be57&query=${this.metadata?.series?.seriesTitle}`);
    const data = await response.json();
    console.log(data);
  }

  private handleSave() {
    console.log(this.metadata, this.contentCtx);
  }

  private hideMetadata() {
    this.dispatchEvent(new ShowMetadataEvent({ index: -1 }));
    this.scrollContainer.scrollTop = 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'metadata-info': MetadataInfoBar;
  }
}
