class SeekableResizedEvent extends CustomEvent {
    constructor(init) {
        super(SeekableResizedEvent.eventName, init);
        this.init = init;
    }
}
SeekableResizedEvent.eventName = 'seekable-resized';
export default SeekableResizedEvent;
//# sourceMappingURL=seekable-resized.js.map