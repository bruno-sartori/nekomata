// Constants
export const OPEN_CAST_PLAYER = 'OPEN_CAST_PLAYER';
export const CLOSE_CAST_PLAYER = 'CLOSE_CAST_PLAYER';
export const CAST_PLAYER_PLAY = 'CAST_PLAYER_PLAY';
export const CAST_PLAYER_PAUSE = 'CAST_PLAYER_PAUSE';

/*
moviePid,
currentIndex,
podcastPids,
parentPid,
parentTitle,
pageType
*/
/**
 * CLIENT ACTION
 * Opens the cast player and set active video
 * @param payload content object?
 */
export const openCastPlayerAction = (payload: any) => ({
  type: OPEN_CAST_PLAYER,
  payload
});

/**
 * CLIENT ACTION
 * Closes the cast player
 */
export const closeCastPlayerAction = () => ({
  type: CLOSE_CAST_PLAYER
});

/**
 * CLIENT ACTION
 * Sends a play signal to the cast player
 */
export const setCastPlayerPlayAction = () => ({
  type: CAST_PLAYER_PLAY
});

/**
 * CLIENT ACTION
 * Sends a pause signal to the cast player
 */
export const setCastPlayerPauseAction = () => ({
  type: CAST_PLAYER_PAUSE
});
