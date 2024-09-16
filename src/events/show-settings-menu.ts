interface ShowSettingsMenu {
  visible: boolean;
}

interface ShowSettingsMenuEventInit extends CustomEventInit<ShowSettingsMenu> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: ShowSettingsMenu;
}

class ShowSettingsMenuEvent extends CustomEvent<ShowSettingsMenu> {
  protected init: ShowSettingsMenuEventInit;

  public static eventName = 'show-settings-menu';

  constructor(detail: ShowSettingsMenu) {
    const init: ShowSettingsMenuEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(ShowSettingsMenuEvent.eventName, init);
    this.init = init
  }
}

export default ShowSettingsMenuEvent;
