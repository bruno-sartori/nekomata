interface AppendSnapshotEventDetail {
    snapshot: HTMLCanvasElement;
}
interface AppendSnapshotEventInit extends CustomEventInit<AppendSnapshotEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: AppendSnapshotEventDetail;
}
declare class AppendSnapshotEvent extends CustomEvent<AppendSnapshotEventDetail> {
    protected init: AppendSnapshotEventInit;
    static eventName: string;
    constructor(init: AppendSnapshotEventInit);
}
export default AppendSnapshotEvent;
//# sourceMappingURL=append-snapshot.d.ts.map