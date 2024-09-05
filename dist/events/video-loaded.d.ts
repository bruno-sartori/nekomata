interface VideoLoadedEventDetail {
    duration: number;
}
interface VideoLoadedEventInit extends CustomEventInit<VideoLoadedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: VideoLoadedEventDetail;
}
declare class VideoLoadedEvent extends CustomEvent<VideoLoadedEventDetail> {
    protected init: VideoLoadedEventInit;
    static eventName: string;
    constructor(init: VideoLoadedEventInit);
}
export default VideoLoadedEvent;
//# sourceMappingURL=video-loaded.d.ts.map