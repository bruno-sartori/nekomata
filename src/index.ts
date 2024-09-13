import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { nekomataStyle } from './styles/nekomata.style';
import { provide } from '@lit/context';
import { GrabbersContext } from './@types/contexts';
import { initialGrabbersContext } from './contexts/grabbers-context';
import init, { add } from 'lib';
import './components/content/file-uploader';
import { contentContext } from './contexts/content-context';
import UpdateContentContextEvent from './events/update-content-context';

@customElement('nekomata-editor')
export class Nekomata extends LitElement {
  static override styles = nekomataStyle;

  @provide({ context: contentContext })
  private contentCtx: GrabbersContext = initialGrabbersContext;

  constructor() {
    super();
    
    init().then((res) => {
      console.log('AQUQIIII', res);
      const resp = add(1, 2);
      console.log(resp);
    });

    this.addEventListener(UpdateContentContextEvent.eventName, ((e: UpdateContentContextEvent) => {
      this.contentCtx = {
        ...this.contentCtx,
        ...e.detail
      };
    }) as EventListener);
  }

  override render() {
    return html`
      <main class="nekomata-main">
        <file-uploader></file-uploader>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nekomata-main': Nekomata;
  }
}
