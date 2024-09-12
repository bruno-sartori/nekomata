import { ChapterRange } from "../types";
interface ChapterAddedEventInit extends CustomEventInit<ChapterRange> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: ChapterRange;
}
declare class ChapterAddedEvent extends CustomEvent<ChapterRange> {
    protected init: ChapterAddedEventInit;
    static eventName: string;
    constructor(init: ChapterAddedEventInit);
}
export default ChapterAddedEvent;
//# sourceMappingURL=chapter-added.d.ts.map