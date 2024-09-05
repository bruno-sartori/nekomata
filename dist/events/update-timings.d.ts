import { RangeTimings } from "../types";
interface UpdateTimingsEventDetail {
    timings: Array<RangeTimings>;
}
interface UpdateTimingsEventInit extends CustomEventInit<UpdateTimingsEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: UpdateTimingsEventDetail;
}
declare class UpdateTimingsEvent extends CustomEvent<UpdateTimingsEventDetail> {
    protected init: UpdateTimingsEventInit;
    static eventName: string;
    constructor(init: UpdateTimingsEventInit);
}
export default UpdateTimingsEvent;
//# sourceMappingURL=update-timings.d.ts.map