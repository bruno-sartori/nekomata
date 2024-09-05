interface ChapterAddedEventDetail {
  title: string;
  sizeRange: Array<number>;
}

interface ChapterAddedEventInit extends CustomEventInit<ChapterAddedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ChapterAddedEventDetail
}

class ChapterAddedEvent extends CustomEvent<ChapterAddedEventDetail> {
  protected init: ChapterAddedEventInit;

  public static eventName = 'chapter-added';

  constructor(init: ChapterAddedEventInit) {
    super(ChapterAddedEvent.eventName, init);
    this.init = init
  }
}

export default ChapterAddedEvent;
