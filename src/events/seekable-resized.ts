interface SeekableResizedEventDetail {
  rect: DOMRect;
}

interface SeekableResizedEventInit extends CustomEventInit<SeekableResizedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: SeekableResizedEventDetail
}

class SeekableResizedEvent extends CustomEvent<SeekableResizedEventDetail> {
  protected init: SeekableResizedEventInit

  public static eventName = 'seekable-resized';

  constructor(init: SeekableResizedEventInit) {
    super(SeekableResizedEvent.eventName, init);
    this.init = init
  }
}

export default SeekableResizedEvent;
