class UpdateTimeInfoEvent extends CustomEvent {
    constructor(init) {
        super(UpdateTimeInfoEvent.eventName, init);
        this.init = init;
    }
}
UpdateTimeInfoEvent.eventName = 'update-time-info';
export default UpdateTimeInfoEvent;
//# sourceMappingURL=update-time-info.js.map