interface ChapterAddedEventDetail {
    title: string;
    sizeRange: Array<number>;
}
interface ChapterAddedEventInit extends CustomEventInit<ChapterAddedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: ChapterAddedEventDetail;
}
declare class ChapterAddedEvent extends CustomEvent<ChapterAddedEventDetail> {
    protected init: ChapterAddedEventInit;
    static eventName: string;
    constructor(init: ChapterAddedEventInit);
}
export default ChapterAddedEvent;
//# sourceMappingURL=chapter-added.d.ts.map