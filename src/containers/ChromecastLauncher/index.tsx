import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Lib
import ChromecastManager from '@lib/external/ChromecastManager';
// Components
import ChromecastLauncher from '@components/ChromecastLauncher';

const ChromecastLauncherContainer: React.FC = () => {
  const store = useSelector((state: IPrismState) => state);
  const dispatch = useDispatch();
  const { chromecast } = store;
  const { available } = chromecast;

  const handleActivateCast = () => {
    const chromecastManager = new ChromecastManager(store, dispatch);
    chromecastManager.initializeCastApi();
  };

  if (available) {
    return (
      <ChromecastLauncher
        onClick={handleActivateCast}
      />
    );
  }

  return null;
}

export default ChromecastLauncherContainer;
