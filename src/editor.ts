import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import './components/editor/editor-timeline';
import { nekomataStyle } from './styles/nekomata-editor.style';
import { ChapterRange, Progress, RangeTimings } from './types';
import UpdateTimelineContextEvent from './events/update-timeline-context';
import UpdateProgressEvent from './events/update-progress';
import AppendSnapshotEvent from './events/append-snapshot';
import ChapterAddedEvent from './events/chapter-added';
import UpdateTimingsEvent from './events/update-timings';
import { provide } from '@lit/context';
import { initialPlayerContext, playerContext } from './contexts/player-context';
import { GrabbersContext, PlayerContext, SeekableContext, TimelineContext } from './@types/contexts';
import UpdatePlayerContextEvent from './events/update-player-context';
import { initialTimelineContext, timelineContext } from './contexts/timeline-context';
import { initialSeekableContext, seekableContext } from './contexts/seekable-context';
import UpdateSeekableContextEvent from './events/update-seekable-context';
import { grabbersContext, initialGrabbersContext } from './contexts/grabbers-context';
import init, { add } from 'lib';
import UpdateGrabbersContextEvent from './events/update-grabbers-context';

@customElement('nekomata-editor')
export class NekomataEditor extends LitElement {
  static override styles = nekomataStyle;

  @state()
  timings: Array<RangeTimings>  = [];
  
  @state()
  files?: FileList;

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  @state()
  chapters: Array<ChapterRange> = [];

  @provide({ context: playerContext })
  private playerCtx: PlayerContext = initialPlayerContext;

  @provide({ context: timelineContext })
  private timelineCtx: TimelineContext = initialTimelineContext;

  @provide({ context: seekableContext })
  private seekableCtx: SeekableContext = initialSeekableContext;

  @provide({ context: grabbersContext })
  private grabbersCtx: GrabbersContext = initialGrabbersContext;

  constructor() {
    super();
    
    init().then((res) => {
      console.log('AQUQIIII', res);
      const resp = add(1, 2);
      console.log(resp);
    });

    this.addEventListener(UpdatePlayerContextEvent.eventName, ((e: UpdatePlayerContextEvent) => {
      this.playerCtx = {
        ...this.playerCtx,
        ...e.detail
      };
    }) as EventListener);

    this.addEventListener(UpdateTimelineContextEvent.eventName, ((e: UpdateTimelineContextEvent) => {
      this.timelineCtx = {
        ...this.timelineCtx,
        ...e.detail
      };
    }) as EventListener);

    this.addEventListener(UpdateSeekableContextEvent.eventName, ((e: UpdateSeekableContextEvent) => {
      this.seekableCtx = {
        ...this.seekableCtx,
        ...e.detail
      };
    }) as EventListener);

    this.addEventListener(UpdateGrabbersContextEvent.eventName, ((e: UpdateGrabbersContextEvent) => {
      this.grabbersCtx = {
        ...this.grabbersCtx,
        ...e.detail
      };
    }) as EventListener);

    // --------------------------------

    this.addEventListener(UpdateProgressEvent.eventName, ((e: UpdateProgressEvent) => {
      if (e.detail.width) {
        this.progress = {
          ...this.progress,
          width: e.detail.width
        };
      }
      if (e.detail.left) {
        this.progress = {
          ...this.progress,
          left: e.detail.left
        };
      }
    }) as EventListener);

    this.addEventListener(AppendSnapshotEvent.eventName, ((e: AppendSnapshotEvent) => {
      this.snapshots = [...this.snapshots, e.detail.snapshot];
    }) as EventListener);

    this.addEventListener(ChapterAddedEvent.eventName, ((e: ChapterAddedEvent) => {
      this.chapters = [...this.chapters, e.detail];
    }) as EventListener);

    this.addEventListener(UpdateTimingsEvent.eventName, ((e: UpdateTimingsEvent) => {
      console.log('UpdateTimingsEvent', e.detail)
      this.timings = e.detail.timings || [];
    }) as EventListener);
  }

  override render() {
    return html`
      <main class="nekomata-editor">
        <aside class="sidebar">
          <editor-sidebar></editor-sidebar>
        </aside>
        <section class="editor">
          <editor-video .timings=${this.timings}></editor-video>
        </section>
        <section class="editor-toolbar">
          <editor-toolbar 
            .timings=${this.timings} 
            .files=${this.files}
          ></editor-toolbar>
          <editor-timeline
            .timings=${this.timings} 
            .progress=${this.progress}
            .snapshots=${this.snapshots}
            .chapters=${this.chapters}
          ></editor-timeline>
        </section>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nekomata-editor': NekomataEditor;
  }
}
