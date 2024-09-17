interface ShowMetadata {
  index: number;
}

interface ShowMetadataEventInit extends CustomEventInit<ShowMetadata> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ShowMetadata;
}

class ShowMetadataEvent extends CustomEvent<ShowMetadata> {
  protected init: ShowMetadataEventInit;

  public static eventName = 'show-metadata';

  constructor(detail: ShowMetadata) {
    const init: ShowMetadataEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(ShowMetadataEvent.eventName, init);
    this.init = init
  }
}

export default ShowMetadataEvent;
