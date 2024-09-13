import { PlayerContextUnreq } from "../@types/contexts";

interface UpdatePlayerContextEventInit extends CustomEventInit<PlayerContextUnreq> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: PlayerContextUnreq
}

class UpdatePlayerContextEvent extends CustomEvent<PlayerContextUnreq> {
  protected init: UpdatePlayerContextEventInit

  public static eventName = 'update-player-context';

  constructor(detail: PlayerContextUnreq) {
    const init: UpdatePlayerContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdatePlayerContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdatePlayerContextEvent;
