interface VideoPauseEventInit extends CustomEventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail?: {};
}
declare class VideoPauseEvent extends Event {
    protected init: VideoPauseEventInit;
    static eventName: string;
    constructor(init: VideoPauseEventInit);
}
export default VideoPauseEvent;
//# sourceMappingURL=video-pause.d.ts.map