import { ContentContext } from "../@types/contexts";

interface UpdateContentContextEventInit extends CustomEventInit<ContentContext> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ContentContext
}

class UpdateContentContextEvent extends CustomEvent<ContentContext> {
  protected init: UpdateContentContextEventInit;

  public static eventName = 'update-content-context';

  constructor(detail: ContentContext) {
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
