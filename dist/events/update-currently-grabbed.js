class UpdateCurrentlyGrabbedEvent extends CustomEvent {
    constructor(init) {
        super(UpdateCurrentlyGrabbedEvent.eventName, init);
        this.init = init;
    }
}
UpdateCurrentlyGrabbedEvent.eventName = 'update-currently-grabbed';
export default UpdateCurrentlyGrabbedEvent;
//# sourceMappingURL=update-currently-grabbed.js.map