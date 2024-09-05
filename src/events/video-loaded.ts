interface VideoLoadedEventDetail {
  duration: number;
}

interface VideoLoadedEventInit extends CustomEventInit<VideoLoadedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: VideoLoadedEventDetail
}

class VideoLoadedEvent extends CustomEvent<VideoLoadedEventDetail> {
  protected init: VideoLoadedEventInit

  public static eventName = 'video-loaded';

  constructor(init: VideoLoadedEventInit) {
    super(VideoLoadedEvent.eventName, init);
    this.init = init
  }
}

export default VideoLoadedEvent;
