import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { metadataInfoStyle } from '../../styles/metadata-info.style';
import ShowMetadataEvent from '../../events/show-metadata';
import { ContentMetadata } from '../../types';
import { secondsToHHMMSS } from '../../utils/time';
import { consume } from '@lit/context';
import { contentContext, initialContentContext } from '../../contexts/content-context';
import { ContentContext } from '../../@types/contexts';
import { formatTitle } from '../../utils/metadata';
import '../../icons/icon-close-circle';
import '../form/text-field';
import '../form/textarea-field';
import '../form/keywords-field';
import '../form/select-field';

@customElement('metadata-info')
export class MetadataInfoBar extends LitElement { 
  static override styles = metadataInfoStyle;

  @state()
  active: boolean = false;

  @state()
  index: number = -1;

  @consume({ context: contentContext, subscribe: true })
  @state()
  contentCtx: ContentContext = initialContentContext;

  @state()
  metadata?: ContentMetadata = undefined;

  override render() {
    console.log(this.metadata)

    return html`
      <div @click=${this.hideMetadata} class="metadata-info ${this.active ? 'active' : ''}">
        <div @click=${(e: Event) => { e.preventDefault(); e.stopPropagation();}} class="metadata-info__container ${this.active ? 'active' : ''}">
          <div class="metadata-info__container-scroll">
            <button class="metadata-info__close" @click=${this.hideMetadata}>
              <icon-close-circle> </icon-close-circle>
            </button>

            <h1 class="metadata-info__title text">Content Metadata</h1>
            <p class="metadata-info__description text">Add cast, author, number of series and episodes and more.</p>
            
            <form class="metadata-info__form">
              <text-field 
                name="Title" 
                placeholder="Enter title"
                type="text"
                .value=${formatTitle(this.metadata?.fileInfo?.format?.filename || '')}
                id="title"
                @change=${(e: any) => { this.metadata!.title = e.detail.value; }}
              ></text-field>
              <textarea-field
                name="Description" 
                placeholder="Enter a description"
                value=""
                id="description"
                @change=${(e: any) => console.log(e.target.value)}
              ></textarea-field>
              <select-field 
                name="Age Rating"
                id="age-rating"
                placeholder="Select an age rating"
                @change=${(e: any) => console.log(e.target.value)}
              ></select-field>
              <text-field 
                name="Director" 
                placeholder="Enter director name"
                type="text"
                value=""
                id="director"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>
              <text-field 
                name="Cast" 
                placeholder="Enter cast name separated by comma"
                type="text"
                value=""
                id="cast"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>
              <keywords-field 
                name="Keywords" 
                placeholder="Enter keywords separated by space"
                value=""
                id="keywords"
                @change=${(e: any) => console.log(e.target.value)}
              ></keywords-field>
              <keywords-field 
                name="Genres" 
                placeholder="Enter genres separated by space"
                value=""
                id="genres"
                @change=${(e: any) => console.log(e.target.value)}
              ></keywords-field>
              
              <text-field 
                name="Duration"
                disabled
                placeholder="Enter a duration in seconds"
                type="time"
                step="2"
                .value=${secondsToHHMMSS(parseFloat(this.metadata?.fileInfo?.format?.duration || '0')) || '00:00:00'}
                id="duration"
                @change=${(e: any) => console.log(e.target.value)}
              ></text-field>

              <button type="button" @click=${this.handleSave}>Salvar</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }


  private handleSave() {
    console.log(this.metadata, this.contentCtx);
  }

  private hideMetadata() {
    this.dispatchEvent(new ShowMetadataEvent({ index: -1 }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'metadata-info': MetadataInfoBar;
  }
}
