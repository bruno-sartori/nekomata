import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { nekomataStyle } from './styles/nekomata.style';
import { provide } from '@lit/context';
import { ContentContext, SettingsContext, UserContext } from './@types/contexts';
import init, { add } from 'lib';
import { contentContext, initialContentContext } from './contexts/content-context';
import UpdateContentContextEvent from './events/update-content-context';
import './components/content/file-uploader';
import './icons/icon-burguer';
import './components/settings/settings-menu';
import ShowSettingsMenuEvent from './events/show-settings-menu';
import { initialSettingsContext, settingsContext } from './contexts/settings-context';
import UpdateSettingsContextEvent from './events/update-settings-context';
import Fetcher from './utils/fetcher';
import { LoginResponse } from './@types/api';
import { initialUserContext, userContext } from './contexts/user-context';
import UpdateUserContextEvent from './events/update-user-context';

@customElement('nekomata-main')
export class Nekomata extends LitElement {
  static override styles = nekomataStyle;

  @provide({ context: contentContext })
  contentCtx: ContentContext = initialContentContext;

  @provide({ context: settingsContext })
  settingsCtx: SettingsContext = initialSettingsContext;

  @provide({ context: userContext })
  userCtx: UserContext = initialUserContext;

  @state()
  settingsVisible: boolean = false;

  constructor() {
    super();
    
    this.authenticate();
    
    init().then(() => {
      const resp = add(1, 2);
      console.log(resp);
    });

    this.addEventListener(UpdateSettingsContextEvent.eventName, ((e: UpdateSettingsContextEvent) => {
      this.settingsCtx = { ...e.detail };
    }) as EventListener);

    this.addEventListener(UpdateUserContextEvent.eventName, ((e: UpdateUserContextEvent) => {
      this.userCtx = { ...e.detail };
    }) as EventListener);

    this.addEventListener(UpdateContentContextEvent.eventName, ((e: UpdateContentContextEvent) => {
      this.contentCtx = { ...e.detail };
    }) as EventListener);

    this.addEventListener(ShowSettingsMenuEvent.eventName, ((e: ShowSettingsMenuEvent) => {
      this.settingsVisible = e.detail.visible;
    }) as EventListener);
  }

  override render() {
    return html`
      <main class="nekomata-main">
        <div class="nekomata-main__container">
          <icon-burguer @click=${() => { this.settingsVisible = true }} style="position: absolute; left: 1rem; top: 1rem;"></icon-burguer>
          <settings-menu .active=${this.settingsVisible}></settings-menu>
          <file-uploader></file-uploader>
        </div>
      </main>
    `;
  }

  private async authenticate() {
    try {
      const response = await Fetcher.post<LoginResponse>('/auth/login', { 
        // @ts-ignore
        login: 'brunosartori.dev@gmail.com',
        // @ts-ignore 
        password: 'bukassas9'
      });
      
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error(error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nekomata-main': Nekomata;
  }
}
