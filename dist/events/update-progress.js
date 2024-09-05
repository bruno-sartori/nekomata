class UpdateProgressEvent extends CustomEvent {
    constructor(init) {
        super(UpdateProgressEvent.eventName, init);
        this.init = init;
    }
}
UpdateProgressEvent.eventName = 'update-progress';
export default UpdateProgressEvent;
//# sourceMappingURL=update-progress.js.map