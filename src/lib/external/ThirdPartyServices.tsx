import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';

// Services
import ChromecastManager from './ChromecastManager';

export interface IThirdPartyScript {
  init: () => void;
  renderTag?: () => ReactElement;
}

declare interface IThirdPartyScriptsService {
  loadScripts: () => void;
  renderTags: () => any;
}

class ThirdPartyServices implements IThirdPartyScriptsService {
  private services: IThirdPartyScript[];
  private state: IPrismState;
  private dispatch: Dispatch;
  
  constructor(state: IPrismState, dispatch: Dispatch) {
    this.state = state;
    this.dispatch = dispatch;
    this.services = [new ChromecastManager(this.state, this.dispatch)]; // load services here
  }

  loadScripts = () => {
    for (let i = 0; i < this.services.length; i++) {
      const service = this.services[i];
      service.init();
    }
  };

  renderTags = () =>  {
    this.services.map((o: IThirdPartyScript) => {
      if (typeof o.renderTag !== 'undefined') {
        return o.renderTag();
      }

      return <></>;
    });
  };
}

export default ThirdPartyServices;
