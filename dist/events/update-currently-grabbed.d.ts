interface UpdateCurrentlyGrabbedEventDetail {
    index: number;
    type: string;
}
interface UpdateCurrentlyGrabbedEventInit extends CustomEventInit<UpdateCurrentlyGrabbedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: UpdateCurrentlyGrabbedEventDetail;
}
declare class UpdateCurrentlyGrabbedEvent extends CustomEvent<UpdateCurrentlyGrabbedEventDetail> {
    protected init: UpdateCurrentlyGrabbedEventInit;
    static eventName: string;
    constructor(init: UpdateCurrentlyGrabbedEventInit);
}
export default UpdateCurrentlyGrabbedEvent;
//# sourceMappingURL=update-currently-grabbed.d.ts.map