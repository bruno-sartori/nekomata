interface FilesAddedEventDetail {
  files: FileList
}

interface FilesAddedEventInit extends CustomEventInit<FilesAddedEventDetail> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: FilesAddedEventDetail
}

class FilesAddedEvent extends CustomEvent<FilesAddedEventDetail> {
  protected init: FilesAddedEventInit

  public static eventName = 'files-added';

  constructor(init: FilesAddedEventInit) {
    super(FilesAddedEvent.eventName, init);
    this.init = init
  }
}

export default FilesAddedEvent;
