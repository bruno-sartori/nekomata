class FilesAddedEvent extends CustomEvent {
    constructor(init) {
        super(FilesAddedEvent.eventName, init);
        this.init = init;
    }
}
FilesAddedEvent.eventName = 'files-added';
export default FilesAddedEvent;
//# sourceMappingURL=files-added.js.map