import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { timelineChaptersStyle } from '../../styles/timeline-chapters.style';
import { ChapterRange } from '../../types';
import { consume } from '@lit/context';
import { playerContext } from '../../contexts/player-context';
import { PlayerContext } from '../../@types/contexts';

@customElement('timeline-chapters')
export class TimelineChapters extends LitElement {
  static override styles = timelineChaptersStyle;

  @state()
  chapters: Array<ChapterRange> = [];

  @consume({ context: playerContext, subscribe: true })
  @state()
  private playerCtx: PlayerContext = {
    playing: false,
    seek: 0,
    src: '',
    video: undefined
  };

  override render() {
    return html`
      <div class="chapters" id="chapters">
        ${this.chapters.map((chapter) => {
          const sizeRange = [
            chapter.range.start / (this.playerCtx.video?.duration ?? 1) * 100,
            chapter.range.end / (this.playerCtx.video?.duration ?? 1) * 100
          ];
          
          return html`
            <div 
              class="chapters__chapter" 
              style="left: ${sizeRange[0]}%; width: ${sizeRange[1] - sizeRange[0]}%;"
            >
              ${chapter.title}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'timeline-chapters': TimelineChapters;
  }
}
