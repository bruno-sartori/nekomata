interface UpdateSeekableStyleEventDetail {
    style: {
        backgroundImage: string;
    };
}
interface UpdateSeekableStyleEventInit extends CustomEventInit<UpdateSeekableStyleEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: UpdateSeekableStyleEventDetail;
}
declare class UpdateSeekableStyleEvent extends CustomEvent<UpdateSeekableStyleEventDetail> {
    protected init: UpdateSeekableStyleEventInit;
    static eventName: string;
    constructor(init: UpdateSeekableStyleEventInit);
}
export default UpdateSeekableStyleEvent;
//# sourceMappingURL=update-seekable-style.d.ts.map