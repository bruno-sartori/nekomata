import { TimelineContextUnreq } from "../@types/contexts";

interface UpdateTimelineContextEventInit extends CustomEventInit<TimelineContextUnreq> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: TimelineContextUnreq
}

class UpdateTimelineContextEvent extends CustomEvent<TimelineContextUnreq> {
  protected init: UpdateTimelineContextEventInit;

  public static eventName = 'update-timeline-context';

  constructor(detail: TimelineContextUnreq) {
    const init: UpdateTimelineContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateTimelineContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateTimelineContextEvent;
