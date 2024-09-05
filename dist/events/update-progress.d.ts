interface UpdateProgressEventDetail {
    width?: string;
    left?: string;
}
interface UpdateProgressEventInit extends CustomEventInit<UpdateProgressEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: UpdateProgressEventDetail;
}
declare class UpdateProgressEvent extends CustomEvent<UpdateProgressEventDetail> {
    protected init: UpdateProgressEventInit;
    static eventName: string;
    constructor(init: UpdateProgressEventInit);
}
export default UpdateProgressEvent;
//# sourceMappingURL=update-progress.d.ts.map