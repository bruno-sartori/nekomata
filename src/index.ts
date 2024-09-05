import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/editor/editor-sidebar';
import './components/editor/editor-video';
import './components/editor/editor-toolbar';
import { nekomataStyle } from './styles/nekomata.style';
import { CurrentlyGrabbed, RangeTimings } from './types';
import UpdateCurrentlyGrabbedEvent from './events/update-currently-grabbed';
import VideoPauseEvent from './events/video-pause';
import VideoSeekEvent from './events/video-seek';
import FilesAddedEvent from './events/files-added';

@customElement('nekomata-editor')
export class Nekomata extends LitElement {
  static override styles = nekomataStyle;

  private timings: Array<RangeTimings>  = [];
  private currentlyGrabbed: CurrentlyGrabbed = { index: 0, type: 'none' };

  @state()
  videoPlaying = false;
  
  @state()
  private videoSeekTime = 0;
  
  @state()
  private videoSrc = '';

  constructor() {
    super();
    
    this.addEventListener(UpdateCurrentlyGrabbedEvent.eventName, ((e: UpdateCurrentlyGrabbedEvent) => {
      this.currentlyGrabbed = e.detail;
    }) as EventListener);

    this.addEventListener(VideoPauseEvent.eventName, () => {
      this.videoPlaying = false;
    });

    this.addEventListener(VideoSeekEvent.eventName, ((e: VideoSeekEvent) => {
      this.videoSeekTime = e.detail.seekTime;
    }) as EventListener);

    this.addEventListener(FilesAddedEvent.eventName, ((e: FilesAddedEvent) => {
      console.log('AQUIIII')
      this.videoSrc = URL.createObjectURL(e.detail.files[0]);
      this.videoPlaying = true;
    }) as EventListener);

    console.log(this.videoSeekTime)
  }

  override render() {
    return html`
      <main class="nekomata-editor">
        <aside class="sidebar">
          <editor-sidebar></editor-sidebar>
        </aside>
        <section class="editor">
          <editor-video 
            .timings=${this.timings} 
            .videoPlaying=${this.videoPlaying} 
            .videoSeekTime=${this.videoSeekTime} 
            .videoSrc=${this.videoSrc}>
          </editor-video>
        </section>
        <footer id="footer">
          <editor-toolbar .timings=${this.timings} .currentlyGrabbed=${this.currentlyGrabbed}></editor-toolbar>
        </footer>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nekomata-editor': Nekomata;
  }
}
