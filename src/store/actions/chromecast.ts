// Constants
export const CHROMECAST_ACTIVE = 'CHROMECAST_ACTIVE';
export const CHROMECAST_INACTIVE = 'CHROMECAST_INACTIVE';
export const CHROMECAST_AVAILABLE = 'CHROMECAST_AVAILABLE';
export const CHROMECAST_UNAVAILABLE = 'CHROMECAST_UNAVAILABLE';
export const CHROMECAST_VIDEO_STATE = 'CHROMECAST_VIDEO_STATE';
export const CHROMECAST_ACTIVE_CAST_VIDEO = 'CHROMECAST_ACTIVE_CAST_VIDEO';
export const SET_CHROMECAST_CONTENT = 'SET_CHROMECAST_CONTENT';
export const SET_CHROMECAST_MEDIA = 'SET_CHROMECAST_MEDIA';

/**
 * CLIENT ACTION
 * Sets chromecast state to active
 */
export const chromecastActiveAction = (deviceName: string) => {
  return {
    type: CHROMECAST_ACTIVE,
    payload: deviceName,
  };
};

/**
 * CLIENT ACTION
 * Sets chromecast state to inactive
 */
export const chromecastInactiveAction = () => {
  return {
    type: CHROMECAST_INACTIVE
  };
};

/**
 * CLIENT ACTION
 * Sets chromecast state to available
 */
export const chromecastAvailableAction = () => {
  return {
    type: CHROMECAST_AVAILABLE
  };
};

/**
 * CLIENT ACTION
 * Sets chromecast state to unavailable
 */
export const chromecastUnavailableAction = () => {
  return {
    type: CHROMECAST_UNAVAILABLE
  };
};

/**
 * CLIENT ACTION
 * Sets chromecast video state
 */
export const setChromecastVideoStateAction = (value: any) => {
  return {
    type: CHROMECAST_VIDEO_STATE,
    payload: value
  }
}

/**
 * CLIENT ACTION
 * Sets the active video
 */
export const setActiveCastVideoAction = (activeCastVideo: string) => {
  return {
    type: CHROMECAST_ACTIVE_CAST_VIDEO,
    payload: activeCastVideo
  }
}

/**
 * CLIENT ACTION
 * Sets the active content
 */
export const setChromecastContentAction = (content: IContent) => {
  return {
    type: SET_CHROMECAST_CONTENT,
    payload: content
  }
}

/**
 * CLIENT ACTION
 * Sets the active media
 */
export const setChromecastMediaAction = (media: IMedia) => {
  return {
    type: SET_CHROMECAST_MEDIA,
    payload: media
  }
}
