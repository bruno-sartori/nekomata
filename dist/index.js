var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import './components/editor/editor-timeline';
import { nekomataStyle } from './styles/nekomata.style';
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
import UpdatePlayerContextEvent from './events/update-player-context';
let Nekomata = class Nekomata extends LitElement {
    constructor() {
        super();
        this.timings = [];
        this.currentlyGrabbed = { index: 0, type: 'none' };
        this.fillTimeline = {
            duration: 0,
            metric: 'hours',
            fill: false,
        };
        this.shouldShowGrabbers = false;
        this.seekableStyle = {
            backgroundImage: ''
        };
        this.progress = {};
        this.snapshots = [];
        this.chapters = [];
        this.playerCtx = {
            duration: 0,
            playing: false,
            seek: 0,
            src: ''
        };
        this.addEventListener(UpdateCurrentlyGrabbedEvent.eventName, ((e) => {
            this.currentlyGrabbed = e.detail;
        }));
        this.addEventListener(VideoPauseEvent.eventName, () => {
            this.playerCtx = {
                ...this.playerCtx,
                playing: false
            };
        });
        this.addEventListener(VideoSeekEvent.eventName, ((e) => {
            this.playerCtx = {
                ...this.playerCtx,
                seek: e.detail.seekTime
            };
        }));
        this.addEventListener(FilesAddedEvent.eventName, ((e) => {
            this.files = e.detail.files;
            this.playerCtx = {
                ...this.playerCtx,
                src: URL.createObjectURL(e.detail.files[0]),
                playing: true,
            };
        }));
        this.addEventListener(VideoLoadedEvent.eventName, ((e) => {
            this.playerCtx = {
                ...this.playerCtx,
                duration: e.detail.duration
            };
        }));
        this.addEventListener(FillTimelineEvent.eventName, ((e) => {
            this.fillTimeline.duration = e.detail.duration;
            this.fillTimeline.metric = e.detail.metric;
            this.fillTimeline.fill = true;
        }));
        this.addEventListener(AddGrabbersEvent.eventName, (() => {
            this.shouldShowGrabbers = true;
        }));
        this.addEventListener(SeekableResizedEvent.eventName, ((e) => {
            this.seekableRect = e.detail.rect;
        }));
        this.addEventListener(UpdateSeekableStyleEvent.eventName, ((e) => {
            this.seekableStyle = e.detail.style;
        }));
        this.addEventListener(UpdateProgressEvent.eventName, ((e) => {
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
        }));
        this.addEventListener(AppendSnapshotEvent.eventName, ((e) => {
            this.snapshots = [...this.snapshots, e.detail.snapshot];
        }));
        this.addEventListener(ChapterAddedEvent.eventName, ((e) => {
            this.chapters = [...this.chapters, e.detail];
        }));
        this.addEventListener(UpdateTimingsEvent.eventName, ((e) => {
            console.log('UpdateTimingsEvent', e.detail);
            this.timings = e.detail.timings || [];
        }));
        this.addEventListener(UpdatePlayerContextEvent.eventName, ((e) => {
            this.playerCtx = {
                ...this.playerCtx,
                ...e.detail
            };
        }));
    }
    render() {
        return html `
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
};
Nekomata.styles = nekomataStyle;
__decorate([
    state()
], Nekomata.prototype, "timings", void 0);
__decorate([
    state()
], Nekomata.prototype, "currentlyGrabbed", void 0);
__decorate([
    state()
], Nekomata.prototype, "files", void 0);
__decorate([
    state()
], Nekomata.prototype, "fillTimeline", void 0);
__decorate([
    state()
], Nekomata.prototype, "shouldShowGrabbers", void 0);
__decorate([
    state()
], Nekomata.prototype, "seekableRect", void 0);
__decorate([
    state()
], Nekomata.prototype, "seekableStyle", void 0);
__decorate([
    state()
], Nekomata.prototype, "progress", void 0);
__decorate([
    state()
], Nekomata.prototype, "snapshots", void 0);
__decorate([
    state()
], Nekomata.prototype, "chapters", void 0);
__decorate([
    provide({ context: playerContext })
], Nekomata.prototype, "playerCtx", void 0);
Nekomata = __decorate([
    customElement('nekomata-editor')
], Nekomata);
export { Nekomata };
//# sourceMappingURL=index.js.map