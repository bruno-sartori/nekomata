interface UpdateTimeInfoEventDetail {
    currentTime: number;
    duration: number;
}
interface UpdateTimeInfoEventInit extends CustomEventInit<UpdateTimeInfoEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: UpdateTimeInfoEventDetail;
}
declare class UpdateTimeInfoEvent extends CustomEvent<UpdateTimeInfoEventDetail> {
    protected init: UpdateTimeInfoEventInit;
    static eventName: string;
    constructor(init: UpdateTimeInfoEventInit);
}
export default UpdateTimeInfoEvent;
//# sourceMappingURL=update-time-info.d.ts.map