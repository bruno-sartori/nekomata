interface VideoTimeUpdatedEventDetail {
  seek: number;
  currentTime: number;
  duration: number;
}

interface VideoTimeUpdatedEventInit extends CustomEventInit<VideoTimeUpdatedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: VideoTimeUpdatedEventDetail
}

class VideoTimeUpdatedEvent extends CustomEvent<VideoTimeUpdatedEventDetail> {
  protected init: VideoTimeUpdatedEventInit

  public static eventName = 'video-time-updated';

  constructor(init: VideoTimeUpdatedEventInit) {
    super(VideoTimeUpdatedEvent.eventName, init);
    this.init = init
  }
}

export default VideoTimeUpdatedEvent;
