interface FillTimelineEventDetail {
  duration: number;
  metric: 'hours' | 'minutes';
}

interface FillTimelineEventInit extends CustomEventInit<FillTimelineEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: FillTimelineEventDetail
}

class FillTimelineEvent extends CustomEvent<FillTimelineEventDetail> {
  protected init: FillTimelineEventInit;

  public static eventName = 'fill-timeline';

  constructor(init: FillTimelineEventInit) {
    super(FillTimelineEvent.eventName, init);
    this.init = init
  }
}

export default FillTimelineEvent;
