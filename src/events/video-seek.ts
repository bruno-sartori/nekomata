interface VideoSeekEventDetail {
  seekTime: number;
}

interface VideoSeekEventInit extends CustomEventInit<VideoSeekEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: VideoSeekEventDetail
}

class VideoSeekEvent extends CustomEvent<VideoSeekEventDetail> {
  protected init: VideoSeekEventInit

  public static eventName = 'video-seek';

  constructor(init: VideoSeekEventInit) {
    super(VideoSeekEvent.eventName, init);
    this.init = init
  }
}

export default VideoSeekEvent;
