import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import './components/editor/editor-timeline';
import { nekomataStyle } from './styles/nekomata.style';
import { ChapterRange, CurrentlyGrabbed, FillTimeline, Progress, RangeTimings, SeekableStyle } from './types';
import UpdateCurrentlyGrabbedEvent from './events/update-currently-grabbed';
import VideoPauseEvent from './events/video-pause';
import VideoSeekEvent from './events/video-seek';
import FilesAddedEvent from './events/files-added';
import VideoLoadedEvent from './events/video-loaded';
import FillTimelineEvent from './events/fill-timeline';
import AddGrabbersEvent from './events/add-grabbers';
import SeekableResizedEvent from './events/seekable-resized';
import UpdateSeekableStyleEvent from './events/update-seekable-style';
import UpdateProgressEvent from './events/update-progress';
import AppendSnapshotEvent from './events/append-snapshot';
import ChapterAddedEvent from './events/chapter-added';
import UpdateTimingsEvent from './events/update-timings';
import { provide } from '@lit/context';
import { playerContext } from './contexts/player-context';
import { PlayerContext } from './@types/contexts';
import UpdatePlayerContextEvent from './events/update-player-context';

import init, { add } from 'lib';

@customElement('nekomata-editor')
export class Nekomata extends LitElement {
  static override styles = nekomataStyle;

  @state()
  timings: Array<RangeTimings>  = [];
  
  @state()
  currentlyGrabbed: CurrentlyGrabbed = { index: 0, type: 'none' };

  @state()
  files?: FileList;

  @state()
  fillTimeline: FillTimeline = {
    duration: 0,
    metric: 'hours',
    fill: false,
  }

  @state()
  shouldShowGrabbers = false;

  @state()
  seekableRect?: DOMRect;

  @state()
  seekableStyle: SeekableStyle = {
    backgroundImage: ''
  };

  @state()
  progress: Progress = {};

  @state()
  snapshots: Array<HTMLCanvasElement> = [];

  @state()
  chapters: Array<ChapterRange> = [];

  @provide({ context: playerContext })
  playerCtx: PlayerContext = {
    playing: false,
    seek: 0,
    src: ''
  };

  constructor() {
    super();
    
    init().then((res) => {
      console.log('AQUQIIII', res);
      const resp = add(1, 2);
      console.log(resp);
    });

    
    this.addEventListener(UpdateCurrentlyGrabbedEvent.eventName, ((e: UpdateCurrentlyGrabbedEvent) => {
      this.currentlyGrabbed = e.detail;
    }) as EventListener);

    this.addEventListener(VideoPauseEvent.eventName, () => {
      this.playerCtx = {
        ...this.playerCtx,
        playing: false
      };
    });

    this.addEventListener(VideoSeekEvent.eventName, ((e: VideoSeekEvent) => {
      this.playerCtx = {
        ...this.playerCtx,
        seek: e.detail.seekTime
      };
    }) as EventListener);

    this.addEventListener(FilesAddedEvent.eventName, ((e: FilesAddedEvent) => {
      this.files = e.detail.files;
      this.playerCtx = {
        ...this.playerCtx,
        src: URL.createObjectURL(e.detail.files[0]),
        playing: true,
      };
    }) as EventListener);

    this.addEventListener(VideoLoadedEvent.eventName, (() => {
      this.playerCtx = {
        ...this.playerCtx,
      };
    }) as EventListener);

    this.addEventListener(FillTimelineEvent.eventName, ((e: FillTimelineEvent) => {
      this.fillTimeline.duration = e.detail.duration;
      this.fillTimeline.metric = e.detail.metric;
      this.fillTimeline.fill = true;
    }) as EventListener);

    this.addEventListener(AddGrabbersEvent.eventName, (() => {
      this.shouldShowGrabbers = true;
    }) as EventListener);

    this.addEventListener(SeekableResizedEvent.eventName, ((e: SeekableResizedEvent) => {
      this.seekableRect = e.detail.rect
    }) as EventListener);

    this.addEventListener(UpdateSeekableStyleEvent.eventName, ((e: UpdateSeekableStyleEvent) => {
      this.seekableStyle = e.detail.style;
    }) as EventListener);

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

    this.addEventListener(UpdatePlayerContextEvent.eventName, ((e: UpdatePlayerContextEvent) => {
      this.playerCtx = {
        ...this.playerCtx,
        ...e.detail
      };
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
            .shouldShowGrabbers=${this.shouldShowGrabbers}
            .timings=${this.timings} 
            .currentlyGrabbed=${this.currentlyGrabbed}
            .fillTimeline=${this.fillTimeline}
            .seekableRect=${this.seekableRect}
            .seekableStyle=${this.seekableStyle}
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
    'nekomata-editor': Nekomata;
  }
}
