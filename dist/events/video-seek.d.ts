interface VideoSeekEventDetail {
    seekTime: number;
}
interface VideoSeekEventInit extends CustomEventInit<VideoSeekEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: VideoSeekEventDetail;
}
declare class VideoSeekEvent extends CustomEvent<VideoSeekEventDetail> {
    protected init: VideoSeekEventInit;
    static eventName: string;
    constructor(init: VideoSeekEventInit);
}
export default VideoSeekEvent;
//# sourceMappingURL=video-seek.d.ts.map