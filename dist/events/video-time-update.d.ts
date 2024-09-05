interface VideoTimeUpdatedEventDetail {
    seek: number;
    currentTime: number;
    duration: number;
}
interface VideoTimeUpdatedEventInit extends CustomEventInit<VideoTimeUpdatedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: VideoTimeUpdatedEventDetail;
}
declare class VideoTimeUpdatedEvent extends CustomEvent<VideoTimeUpdatedEventDetail> {
    protected init: VideoTimeUpdatedEventInit;
    static eventName: string;
    constructor(init: VideoTimeUpdatedEventInit);
}
export default VideoTimeUpdatedEvent;
//# sourceMappingURL=video-time-update.d.ts.map