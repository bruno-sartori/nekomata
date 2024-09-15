import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { nekomataStyle } from './styles/nekomata.style';
import { provide } from '@lit/context';
import { ContentContext } from './@types/contexts';
import init, { add } from 'lib';
import './components/content/file-uploader';
import { contentContext, initialContentContext } from './contexts/content-context';
import UpdateContentContextEvent from './events/update-content-context';

@customElement('nekomata-main')
export class Nekomata extends LitElement {
  static override styles = nekomataStyle;

  @provide({ context: contentContext })
  contentCtx: ContentContext = initialContentContext;

  constructor() {
    super();
    
    init().then(() => {
      const resp = add(1, 2);
      console.log(resp);
    });

    this.addEventListener(UpdateContentContextEvent.eventName, ((e: UpdateContentContextEvent) => {
      this.contentCtx = { ...e.detail };
    }) as EventListener);
  }

  override render() {
    return html`
      <main class="nekomata-main">
        <div class="nekomata-main__container">	
          <file-uploader></file-uploader>
        </div>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nekomata-main': Nekomata;
  }
}
