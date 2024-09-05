class VideoPauseEvent extends Event {
    constructor(init) {
        super(VideoPauseEvent.eventName, init);
        this.init = init;
    }
}
VideoPauseEvent.eventName = 'video-pause';
export default VideoPauseEvent;
//# sourceMappingURL=video-pause.js.map