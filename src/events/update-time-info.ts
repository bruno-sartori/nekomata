interface UpdateTimeInfoEventDetail {
  currentTime: number;
  duration: number;
}

interface UpdateTimeInfoEventInit extends CustomEventInit<UpdateTimeInfoEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UpdateTimeInfoEventDetail
}

class UpdateTimeInfoEvent extends CustomEvent<UpdateTimeInfoEventDetail> {
  protected init: UpdateTimeInfoEventInit

  public static eventName = 'update-time-info';

  constructor(init: UpdateTimeInfoEventInit) {
    super(UpdateTimeInfoEvent.eventName, init);
    this.init = init
  }
}

export default UpdateTimeInfoEvent;
