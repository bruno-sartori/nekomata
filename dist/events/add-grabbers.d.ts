interface AddGrabbersEventInit extends CustomEventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail?: {};
}
declare class AddGrabbersEvent extends Event {
    protected init: AddGrabbersEventInit;
    static eventName: string;
    constructor(init: AddGrabbersEventInit);
}
export default AddGrabbersEvent;
//# sourceMappingURL=add-grabbers.d.ts.map