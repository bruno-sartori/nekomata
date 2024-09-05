class VideoSeekEvent extends CustomEvent {
    constructor(init) {
        super(VideoSeekEvent.eventName, init);
        this.init = init;
    }
}
VideoSeekEvent.eventName = 'video-seek';
export default VideoSeekEvent;
//# sourceMappingURL=video-seek.js.map