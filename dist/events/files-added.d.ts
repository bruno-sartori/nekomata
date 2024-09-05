interface FilesAddedEventDetail {
    files: FileList;
}
interface FilesAddedEventInit extends CustomEventInit<FilesAddedEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: FilesAddedEventDetail;
}
declare class FilesAddedEvent extends CustomEvent<FilesAddedEventDetail> {
    protected init: FilesAddedEventInit;
    static eventName: string;
    constructor(init: FilesAddedEventInit);
}
export default FilesAddedEvent;
//# sourceMappingURL=files-added.d.ts.map