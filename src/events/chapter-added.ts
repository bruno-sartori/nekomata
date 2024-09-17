import { ChapterRange } from "../types";

interface ChapterAddedEventInit extends CustomEventInit<ChapterRange> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ChapterRange
}

class ChapterAddedEvent extends CustomEvent<ChapterRange> {
  protected init: ChapterAddedEventInit;

  public static eventName = 'chapter-added';

  constructor(init: ChapterAddedEventInit) {
    super(ChapterAddedEvent.eventName, init);
    this.init = init
  }
}

export default ChapterAddedEvent;
