interface UpdateSeekableStyleEventDetail {
  style: {
    backgroundImage: string;
  }
}

interface UpdateSeekableStyleEventInit extends CustomEventInit<UpdateSeekableStyleEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UpdateSeekableStyleEventDetail
}

class UpdateSeekableStyleEvent extends CustomEvent<UpdateSeekableStyleEventDetail> {
  protected init: UpdateSeekableStyleEventInit

  public static eventName = 'update-seekable-style';

  constructor(init: UpdateSeekableStyleEventInit) {
    super(UpdateSeekableStyleEvent.eventName, init);
    this.init = init
  }
}

export default UpdateSeekableStyleEvent;
