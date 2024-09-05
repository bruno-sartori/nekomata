interface FillTimelineEventDetail {
    duration: number;
    metric: 'hours' | 'minutes';
}
interface FillTimelineEventInit extends CustomEventInit<FillTimelineEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: FillTimelineEventDetail;
}
declare class FillTimelineEvent extends CustomEvent<FillTimelineEventDetail> {
    protected init: FillTimelineEventInit;
    static eventName: string;
    constructor(init: FillTimelineEventInit);
}
export default FillTimelineEvent;
//# sourceMappingURL=fill-timeline.d.ts.map