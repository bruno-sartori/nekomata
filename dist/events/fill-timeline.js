class FillTimelineEvent extends CustomEvent {
    constructor(init) {
        super(FillTimelineEvent.eventName, init);
        this.init = init;
    }
}
FillTimelineEvent.eventName = 'fill-timeline';
export default FillTimelineEvent;
//# sourceMappingURL=fill-timeline.js.map