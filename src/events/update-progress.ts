interface UpdateProgressEventDetail {
  width?: string;
  left?: string;
}

interface UpdateProgressEventInit extends CustomEventInit<UpdateProgressEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UpdateProgressEventDetail
}

class UpdateProgressEvent extends CustomEvent<UpdateProgressEventDetail> {
  protected init: UpdateProgressEventInit

  public static eventName = 'update-progress';

  constructor(init: UpdateProgressEventInit) {
    super(UpdateProgressEvent.eventName, init);
    this.init = init
  }
}

export default UpdateProgressEvent;
