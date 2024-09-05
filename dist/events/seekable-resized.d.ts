interface SeekableResizedEventDetail {
    rect: DOMRect;
}
interface SeekableResizedEventInit extends CustomEventInit<SeekableResizedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: SeekableResizedEventDetail;
}
declare class SeekableResizedEvent extends CustomEvent<SeekableResizedEventDetail> {
    protected init: SeekableResizedEventInit;
    static eventName: string;
    constructor(init: SeekableResizedEventInit);
}
export default SeekableResizedEvent;
//# sourceMappingURL=seekable-resized.d.ts.map