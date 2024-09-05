class UpdateTimingsEvent extends CustomEvent {
    constructor(init) {
        super(UpdateTimingsEvent.eventName, init);
        this.init = init;
    }
}
UpdateTimingsEvent.eventName = 'update-timings';
export default UpdateTimingsEvent;
//# sourceMappingURL=update-timings.js.map