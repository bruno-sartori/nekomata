class ChapterAddedEvent extends CustomEvent {
    constructor(init) {
        super(ChapterAddedEvent.eventName, init);
        this.init = init;
    }
}
ChapterAddedEvent.eventName = 'chapter-added';
export default ChapterAddedEvent;
//# sourceMappingURL=chapter-added.js.map