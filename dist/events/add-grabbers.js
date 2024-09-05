class AddGrabbersEvent extends Event {
    constructor(init) {
        super(AddGrabbersEvent.eventName, init);
        this.init = init;
    }
}
AddGrabbersEvent.eventName = 'add-grabbers';
export default AddGrabbersEvent;
//# sourceMappingURL=add-grabbers.js.map