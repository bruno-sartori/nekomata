class VideoLoadedEvent extends CustomEvent {
    constructor(init) {
        super(VideoLoadedEvent.eventName, init);
        this.init = init;
    }
}
VideoLoadedEvent.eventName = 'video-loaded';
export default VideoLoadedEvent;
//# sourceMappingURL=video-loaded.js.map