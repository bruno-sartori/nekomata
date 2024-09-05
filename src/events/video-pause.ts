interface VideoPauseEventInit extends CustomEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: {};
}

class VideoPauseEvent extends Event {
  protected init: VideoPauseEventInit

  public static eventName = 'video-pause';

  constructor(init: VideoPauseEventInit) {
    super(VideoPauseEvent.eventName, init);
    this.init = init
  }
}

export default VideoPauseEvent;
