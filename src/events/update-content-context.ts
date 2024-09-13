import { ContentContextUnreq } from "../@types/contexts";

interface UpdateContentContextEventInit extends CustomEventInit<ContentContextUnreq> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ContentContextUnreq
}

class UpdateContentContextEvent extends CustomEvent<ContentContextUnreq> {
  protected init: UpdateContentContextEventInit;

  public static eventName = 'update-content-context';

  constructor(detail: ContentContextUnreq) {
    const init: UpdateContentContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateContentContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateContentContextEvent;
