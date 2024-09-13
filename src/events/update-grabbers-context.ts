import { GrabbersContextUnreq } from "../@types/contexts";

interface UpdateGrabbersContextEventInit extends CustomEventInit<GrabbersContextUnreq> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: GrabbersContextUnreq
}

class UpdateGrabbersContextEvent extends CustomEvent<GrabbersContextUnreq> {
  protected init: UpdateGrabbersContextEventInit;

  public static eventName = 'update-grabbers-context';

  constructor(detail: GrabbersContextUnreq) {
    const init: UpdateGrabbersContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateGrabbersContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateGrabbersContextEvent;
