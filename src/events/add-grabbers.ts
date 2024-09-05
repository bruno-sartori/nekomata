interface AddGrabbersEventInit extends CustomEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: {}
}

class AddGrabbersEvent extends Event {
  protected init: AddGrabbersEventInit

  public static eventName = 'add-grabbers';

  constructor(init: AddGrabbersEventInit) {
    super(AddGrabbersEvent.eventName, init);
    this.init = init
  }
}

export default AddGrabbersEvent;
