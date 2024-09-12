import { LitElement, PropertyValues, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { videoSidebarStyle } from '../../styles/editor-video.style';
import VideoTimeUpdatedEvent from '../../events/video-time-update';
import VideoLoadedEvent from '../../events/video-loaded';
import UpdateTimingsEvent from '../../events/update-timings';
import { RangeTimings } from '../../types';
import AddGrabbersEvent from '../../events/add-grabbers';
import UpdateTimeInfoEvent from '../../events/update-time-info';
import { secondsToHours, secondsToMinutes } from '../../utils/time';
import FillTimelineEvent from '../../events/fill-timeline';
import AppendSnapshotEvent from '../../events/append-snapshot';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';
import { consume } from '@lit/context';
import { playerContext } from '../../contexts/player-context';
import { PlayerContext } from '../../@types/contexts';
import UpdatePlayerContextEvent from '../../events/update-player-context';

@customElement('editor-video')
export class EditorVideo extends LitElement {
  static override styles = videoSidebarStyle;

  @state()
  private timings: Array<RangeTimings> = []; 

  @query('#video')
  private video: HTMLVideoElement | undefined;

  @consume({ context: playerContext, subscribe: true })
  @state()
  private playerCtx: PlayerContext = {
    playing: false,
    seek: 0,
    src: '',
    video: undefined
  };

  private shouldAddActiveSegments = false;

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this.dispatchEvent(new UpdatePlayerContextEvent({ bubbles: true, composed: true, detail: { video: this.video }}));
  }

  override updated(changedProperties: Map<string, unknown>) {
    console.log(changedProperties);
    
    if (changedProperties.has('playerCtx')) {
      const oldPlayerContext = changedProperties.get('playerCtx') as PlayerContext;

      if (this.playerCtx?.src !== oldPlayerContext?.src) {
        this.video!.src = this.playerCtx?.src;
        this.video?.play();
      }
      
    }
    /*
    if (changedProperties.has("videoSrc")) {
      
    }

    if (changedProperties.has('videoPlaying')) {
      if (this.videoPlaying) {
        this.video?.play();
      } else {
        this.video?.pause();
      }
    }

    if (changedProperties.has('videoSeekTime')) {
      this.video!.currentTime = this.videoSeekTime;
    }*/

    if (changedProperties.has('timings') && this.shouldAddActiveSegments) {
      this.addActiveSegments();
    }

    console.log(changedProperties)
  }

  override render() {
    return html`
      <div class="wrapper">
        <video 
        id="video" 
        autoload="metadata"
        muted
        class="video" 
        @click="${this.handleTogglePlayer}" 
        @timeupdate="${this.handleTimeUpdate}" 
        @loadeddata="${this.handleMediaLoaded}"
        @loadedmetadata="${this.handleLoadedMetadata}"
        ></video>
        <div style="z-index: 9999; color: #fff; font-size: 30px;">${JSON.stringify(this.playerCtx)}</div>
      </div>
    `;
  }

  private fillVideoInfo() {
    const currentTime = this.video!.currentTime;
    const duration = this.video!.duration;
    this.dispatchEvent(new UpdateTimeInfoEvent({ bubbles: true, composed: true, detail: { currentTime, duration }}))
    
    const durationHours = secondsToHours(this.video!.duration);
    const durationMinutes = secondsToMinutes(this.video!.duration);
  
    const timelineDuration = durationHours > 1 ? durationHours : durationMinutes;
    const timelineMetric = durationHours > 1 ? 'hours' : 'minutes';

    this.dispatchEvent(new FillTimelineEvent({ bubbles: true, composed: true, detail: { duration: timelineDuration, metric: timelineMetric }}));
  }

  private handleTogglePlayer(teste: string) { // teste new git hook
    console.log(teste)
    if (this.video?.paused) {
      this.video.play();
    } else {
      this.video?.pause();
    }
  }

  private handleTimeUpdate() {
    const seek = this.video!.currentTime / this.video!.duration * 100;
    this.dispatchEvent(new VideoTimeUpdatedEvent({ bubbles: true, composed: true, detail: { seek, currentTime: this.video!.currentTime, duration: this.video!.duration } }));
  }

  private handleMediaLoaded() {
    this.dispatchEvent(new VideoLoadedEvent({ bubbles: true, composed: true, detail: { duration: this.video!.duration } }));
  }

  private createSnapshotList() {
    const capture = () => {
      if (this.video) {
        const height = 90;
        const width = Math.round((16 / 9) * height);
      
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(this.video, 0, 0, width, height);
    
        this.dispatchEvent(new AppendSnapshotEvent({ bubbles: true, composed: true, detail: { snapshot: canvas }}));
      } else {
        console.log('FAILED CAPTURE')
      }
    }

    this.video?.addEventListener('seeked', capture);
  
    const updateTime = () => {
      let i = 1;
      const interval = setInterval(() => {
        this.video!.currentTime = i * 15;
        i++;
  
        if (i === 16) {
          clearInterval(interval);
        }
      }, 70);
    };
  
    updateTime();
  }

  private addActiveSegments() {
    let colors = ''
    let counter = 0;
    
    console.log('ADD ACTIVE SEGMENTS', this.timings);

    if (this.timings.length > 0) {
      colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings?.[0]?.start / this.video!.duration * 100}%`
      for (let times of this.timings) {
        if (counter > 0) {
          colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.video!.duration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.video!.duration * 100}%`
        }
        colors += `, #655dc2 ${times.start / this.video!.duration * 100}%, #655dc2 ${times.end / this.video!.duration * 100}%`
        counter += 1
      }
      colors += `, rgba(240, 240, 240, 0) ${this.timings?.[counter - 1]?.end / this.video!.duration * 100}%, rgba(240, 240, 240, 0) 100%`
      
      this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` }}}));
    }
  }

  private handleLoadedMetadata() {
    console.log('handleLoadedMetadata', 'init');
    console.log('handleLoadedMetadata - timings', this.timings);

    this.shouldAddActiveSegments = true;

    if (this.timings.length === 0) {
      this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: [{ start: 0, end: 120 }] } }));
      this.dispatchEvent(new AddGrabbersEvent({ bubbles: true, composed: true }));
    }

    this.fillVideoInfo();
    this.createSnapshotList();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-video': EditorVideo;
  }
}
