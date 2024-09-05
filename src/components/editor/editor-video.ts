import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { videoSidebarStyle } from '../../styles/editor-video.style';
import VideoTimeUpdatedEvent from '../../events/video-time-update';
import VideoLoadedEvent from '../../events/video-loaded';
import VideoPauseEvent from '../../events/video-pause';
import UpdateTimingsEvent from '../../events/update-timings';
import { RangeTimings } from '../../types';
import AddGrabbersEvent from '../../events/add-grabbers';
import UpdateTimeInfoEvent from '../../events/update-time-info';
import { secondsToHours, secondsToMinutes } from '../../utils/time';
import FillTimelineEvent from '../../events/fill-timeline';
import AppendSnapshotEvent from '../../events/append-snapshot';
import UpdateSeekableStyleEvent from '../../events/update-seekable-style';

@customElement('editor-video')
export class EditorVideo extends LitElement {
  static override styles = videoSidebarStyle;

  @property({ type: Array })
  timings: Array<RangeTimings> = []; 

  @property({ type: Boolean })
  videoPlaying = false; 
  
  @state()
  videoSeekTime = 0;

  @state()
  videoSrc = ''; 

  @query('#video')
  video: HTMLVideoElement | undefined;

  constructor() {
    super();

    console.log(this.videoSeekTime)

    this.addEventListener(VideoPauseEvent.eventName, () => {
      this.video?.pause();
    });
  }

  override updated(changedProperties: Map<string, unknown>) {
    console.log(`updated(). changedProps: `, changedProperties);
    console.log(changedProperties.has("videoSrc"))
    if (changedProperties.has("videoSrc")) {
      this.video!.src = this.videoSrc;
      this.video?.play();
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
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <video 
          id="video" 
          autoload="metadata"
          class="video" 
          @click="${this.handleTogglePlayer}" 
          @timeupdate="${this.handleTimeUpdate}" 
          @loadeddata="${this.handleMediaLoaded}"
          @loadedmetadata="${this.handleLoadedMetadata}"
        ></video>
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

  private handleTogglePlayer() {
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

  private capture() {
    const height = 90;
    const width = Math.round((16 / 9) * height);
  
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")?.drawImage(this.video!, 0, 0, width, height);

    this.dispatchEvent(new AppendSnapshotEvent({ bubbles: true, composed: true, detail: { snapshot: canvas }}));
  }

  private createSnapshotList() {
    this.video?.addEventListener('seeked', this.capture);
  
    const updateTime = () => {
      let i = 1;
      const interval = setInterval(() => {
        this.video!.currentTime = i * 15;
        i++;
  
        if (i === 16) {
          clearInterval(interval);
        }
      }, 500);
    };
  
    updateTime();
  }

  private addActiveSegments() {
    let colors = ''
    let counter = 0;
    
    colors += `, rgba(240, 240, 240, 0) 0%, rgba(240, 240, 240, 0) ${this.timings[0].start / this.video!.duration * 100}%`
    for (let times of this.timings) {
      if (counter > 0) {
        colors += `, rgba(240, 240, 240, 0) ${this.timings[counter].end / this.video!.duration * 100}%, rgba(240, 240, 240, 0) ${times.start / this.video!.duration * 100}%`
      }
      colors += `, #655dc2 ${times.start / this.video!.duration * 100}%, #655dc2 ${times.end / this.video!.duration * 100}%`
      counter += 1
    }
    colors += `, rgba(240, 240, 240, 0) ${this.timings[counter - 1].end / this.video!.duration * 100}%, rgba(240, 240, 240, 0) 100%`
    
    this.dispatchEvent(new UpdateSeekableStyleEvent({ bubbles: true, composed: true, detail: { style: { backgroundImage: `linear-gradient(to right${colors})` }}}));
  }

  private handleLoadedMetadata() {
    if (this.timings.length === 0) {
      this.dispatchEvent(new UpdateTimingsEvent({ bubbles: true, composed: true, detail: { timings: [{ start: 0, end: 120 }] } }));
      this.dispatchEvent(new AddGrabbersEvent({ bubbles: true, composed: true }));
    }

    this.fillVideoInfo();
    this.createSnapshotList();
    this.addActiveSegments();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-video': EditorVideo;
  }
}
