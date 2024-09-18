import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { progressBarStyle } from '../../styles/progress-bar.style';

@customElement('progress-bar')
export class ProgressBar extends LitElement { 
  static override styles = progressBarStyle;

  @state()
  progress: number = 0;

  @state()
  status: 'success' | 'error' | 'pending' = 'pending';

  override render() {
    
    return html`
      <div class="progress-bar">
        <div class="progress-bar__fill ${this.status === 'error' ? 'error' : ''}" style="width: ${this.progress.toString()}%;"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'progress-bar': ProgressBar;
  }
}
