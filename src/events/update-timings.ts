import { RangeTimings } from "../types";

interface UpdateTimingsEventDetail {
  timings: Array<RangeTimings>;
}

interface UpdateTimingsEventInit extends CustomEventInit<UpdateTimingsEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: UpdateTimingsEventDetail
}

class UpdateTimingsEvent extends CustomEvent<UpdateTimingsEventDetail> {
  protected init: UpdateTimingsEventInit

  public static eventName = 'update-timings';

  constructor(init: UpdateTimingsEventInit) {
    super(UpdateTimingsEvent.eventName, init);
    this.init = init
  }
}

export default UpdateTimingsEvent;
