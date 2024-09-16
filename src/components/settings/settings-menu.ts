import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { settingsMenuStyle } from '../../styles/settings-menu.style';
import { consume } from '@lit/context';
import { SettingsContext } from '../../@types/contexts';
import '../../icons/icon-close-circle';
import '../form/text-field';
import '../form/textarea-field';
import '../form/keywords-field';
import '../form/select-field';
import '../form/select-option';
import '../../icons/icon-age-rating';
import '../../icons/icon-classind';	
import '../../icons/icon-mpa';	
import ShowSettingsMenuEvent from '../../events/show-settings-menu';
import { initialSettingsContext, settingsContext } from '../../contexts/settings-context';
import UpdateSettingsContextEvent from '../../events/update-settings-context';

@customElement('settings-menu')
export class SettingsMenu extends LitElement { 
  static override styles = settingsMenuStyle;

  @state()
  active: boolean = false;

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

            <h1 class="settings-menu__title text">Settings</h1>
            <p class="settings-menu__description text">Change language, rating systems, etc.</p>
            
            <form class="settings-menu__form">
              <select-field 
                name="Rating System"
                id="rating-system"
                .value=${this.settingsCtx.ratingSystem || 'ClassInd'}
                placeholder="Select rating system"
                @change=${this.handleChangeRatingSystem}
              >
                <select-option slot="list" class="option" value="ClassInd">
                  <icon-classind></icon-classind> Classificação Indicativa (Brasil)
                </select-option>
                <select-option slot="list" class="option" value="MPA">
                  <icon-mpa></icon-mpa> Motion Picture Association film rating system
                </select-option>    
              </select-field>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  private handleChangeRatingSystem(e: CustomEvent) {
    const ratingSystem = e.detail.value;
    this.dispatchEvent(new UpdateSettingsContextEvent({ ratingSystem }));
  }


  private hideSettingsMenu() {
    this.dispatchEvent(new ShowSettingsMenuEvent({ visible: false }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-menu': SettingsMenu;
  }
}
