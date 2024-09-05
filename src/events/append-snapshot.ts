interface AppendSnapshotEventDetail {
  snapshot: HTMLCanvasElement;
}

interface AppendSnapshotEventInit extends CustomEventInit<AppendSnapshotEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: AppendSnapshotEventDetail
}

class AppendSnapshotEvent extends CustomEvent<AppendSnapshotEventDetail> {
  protected init: AppendSnapshotEventInit

  public static eventName = 'append-snapshot';

  constructor(init: AppendSnapshotEventInit) {
    super(AppendSnapshotEvent.eventName, init);
    this.init = init
  }
}

export default AppendSnapshotEvent;
