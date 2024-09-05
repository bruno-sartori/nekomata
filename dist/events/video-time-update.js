class VideoTimeUpdatedEvent extends CustomEvent {
    constructor(init) {
        super(VideoTimeUpdatedEvent.eventName, init);
        this.init = init;
    }
}
VideoTimeUpdatedEvent.eventName = 'video-time-updated';
export default VideoTimeUpdatedEvent;
//# sourceMappingURL=video-time-update.js.map