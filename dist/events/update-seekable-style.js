class UpdateSeekableStyleEvent extends CustomEvent {
    constructor(init) {
        super(UpdateSeekableStyleEvent.eventName, init);
        this.init = init;
    }
}
UpdateSeekableStyleEvent.eventName = 'update-seekable-style';
export default UpdateSeekableStyleEvent;
//# sourceMappingURL=update-seekable-style.js.map