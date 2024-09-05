interface UpdateCurrentlyGrabbedEventDetail {
  index: number;
  type: string;
}

interface UpdateCurrentlyGrabbedEventInit extends CustomEventInit<UpdateCurrentlyGrabbedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UpdateCurrentlyGrabbedEventDetail
}

class UpdateCurrentlyGrabbedEvent extends CustomEvent<UpdateCurrentlyGrabbedEventDetail> {
  protected init: UpdateCurrentlyGrabbedEventInit

  public static eventName = 'update-currently-grabbed';

  constructor(init: UpdateCurrentlyGrabbedEventInit) {
    super(UpdateCurrentlyGrabbedEvent.eventName, init);
    this.init = init
  }
}

export default UpdateCurrentlyGrabbedEvent;
