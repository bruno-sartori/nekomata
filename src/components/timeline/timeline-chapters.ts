import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { timelineChaptersStyle } from '../../styles/timeline-chapters.style';
import { ChapterRange } from '../../types';
import { consume } from '@lit/context';
import { initialPlayerContext, playerContext } from '../../contexts/player-context';
import { PlayerContext } from '../../@types/contexts';

@customElement('timeline-chapters')
export class TimelineChapters extends LitElement {
  static override styles = timelineChaptersStyle;

  @state()
  chapters: Array<ChapterRange> = [];

  @consume({ context: playerContext, subscribe: true })
  @state()
  private playerCtx: PlayerContext = initialPlayerContext;

  override render() {
    const duration = this.playerCtx.video?.duration ?? 1;

    return html`
      <div class="chapters" id="chapters">
        ${this.chapters.map((chapter) => {
          const sizeRange = [
            chapter.range.start / duration * 100,
            chapter.range.end / duration * 100
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
