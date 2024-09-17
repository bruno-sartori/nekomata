import { SeekableContextUnreq } from "../@types/contexts";

interface UpdateSeekableContextEventInit extends CustomEventInit<SeekableContextUnreq> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: SeekableContextUnreq
}

class UpdateSeekableContextEvent extends CustomEvent<SeekableContextUnreq> {
  protected init: UpdateSeekableContextEventInit;

  public static eventName = 'update-seekable-context';

  constructor(detail: SeekableContextUnreq) {
    const init: UpdateSeekableContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateSeekableContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateSeekableContextEvent;
