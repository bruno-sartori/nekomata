import { UserContext } from "../@types/contexts";

interface UpdateUserContextEventInit extends CustomEventInit<UserContext> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UserContext;
}

class UpdateUserContextEvent extends CustomEvent<UserContext> {
  protected init: UpdateUserContextEventInit;

  public static eventName = 'update-user-context';

  constructor(detail: UserContext) {
    const init: UpdateUserContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateUserContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateUserContextEvent;
