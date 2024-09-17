import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { settingsMenuStyle } from '../../styles/settings-menu.style';
import { consume } from '@lit/context';
import { SettingsContext } from '../../@types/contexts';
import '../../icons/icon-close-circle';
import '../form/text-field';
import '../form/textarea-field';
import '../form/keywords-field';
import '../form/select-field';
import '../form/select-option';
import '../../icons/icon-age-rating-classind';
import '../../icons/icon-classind';	
import '../../icons/icon-mpa';
import '../../icons/icon-brazil-flag';
import '../../icons/icon-usa-flag';
import '../../icons/icon-spain-flag';
import ShowSettingsMenuEvent from '../../events/show-settings-menu';
import { initialSettingsContext, settingsContext } from '../../contexts/settings-context';
import UpdateSettingsContextEvent from '../../events/update-settings-context';
import { localized, msg } from '@lit/localize';
import { setLocale } from '../../utils/locale';

@localized()
@customElement('settings-menu')
export class SettingsMenu extends LitElement { 
  static override styles = settingsMenuStyle;

  @state()
  active: boolean = false;

  @query('.settings-menu__container')
  scrollContainer!: HTMLElement;

  @consume({ context: settingsContext, subscribe: true })
  @state()
  settingsCtx: SettingsContext = initialSettingsContext;

  override render() {
    return html`
      <div @click=${this.hideSettingsMenu} class="settings-menu ${this.active ? 'active' : ''}">
        <div @click=${(e: Event) => { e.preventDefault(); e.stopPropagation();}} class="settings-menu__container ${this.active ? 'active' : ''}">
          <div class="settings-menu__container-scroll">
            <button class="settings-menu__close" @click=${this.hideSettingsMenu}>
              <icon-close-circle> </icon-close-circle>
            </button>

            <h1 class="settings-menu__title text">${msg('Settings')}</h1>
            <p class="settings-menu__description text">${msg('Change language, rating systems, etc.')}</p>
            
            <form class="settings-menu__form">
              <select-field 
                name="Rating System"
                id="rating-system"
                .value=${this.settingsCtx.ratingSystem || 'ClassInd'}
                placeholder="Select rating system"
                @change=${this.handleChangeRatingSystem}
              >
                <select-option slot="list" class="option" value="ClassInd">
                  <icon-classind></icon-classind> ${msg('Classificação Indicativa (Brasil)')}
                </select-option>
                <select-option slot="list" class="option" value="MPA">
                  <icon-mpa></icon-mpa> ${msg('Motion Picture Association film rating system')}
                </select-option>    
              </select-field>

              <select-field 
                name="Language"
                id="language"
                .value=${this.settingsCtx.language || 'English'}
                placeholder="Select a language"
                @change=${this.handleChangeLanguage}
              >
              <select-option slot="list" class="option" value="en">
                <icon-usa-flag></icon-usa-flag> English
              </select-option>   
              <select-option slot="list" class="option" value="pt-BR">
                <icon-brazil-flag></icon-brazil-flag> Português (Brasil)
              </select-option>
                <select-option slot="list" class="option" value="es-ES">
                  <icon-spain-flag></icon-spain-flag> Español
                </select-option>    
              </select-field>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  private handleChangeLanguage(e: CustomEvent) {
    const language = e.detail.value;
    this.dispatchEvent(new UpdateSettingsContextEvent({ 
      ...this.settingsCtx,
      language 
    }));
    setLocale(e.detail.value);
  }

  private handleChangeRatingSystem(e: CustomEvent) {
    const ratingSystem = e.detail.value;
    this.dispatchEvent(new UpdateSettingsContextEvent({ 
      ...this.settingsCtx,
      ratingSystem 
    }));
  }

  private hideSettingsMenu() {
    this.dispatchEvent(new ShowSettingsMenuEvent({ visible: false }));
    this.scrollContainer.scrollTop = 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-menu': SettingsMenu;
  }
}
