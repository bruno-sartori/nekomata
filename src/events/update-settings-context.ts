import { SettingsContext } from "../@types/contexts";

interface UpdateSettingsContextEventInit extends CustomEventInit<SettingsContext> {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail: SettingsContext
}

class UpdateSettingsContextEvent extends CustomEvent<SettingsContext> {
  protected init: UpdateSettingsContextEventInit;

  public static eventName = 'update-settings-context';

  constructor(detail: SettingsContext) {
    const init: UpdateSettingsContextEventInit = {
      bubbles: true,
      composed: true,
      detail
    };

    super(UpdateSettingsContextEvent.eventName, init);
    this.init = init
  }
}

export default UpdateSettingsContextEvent;
