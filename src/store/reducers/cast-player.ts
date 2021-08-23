// Constants
import { 
  CAST_PLAYER_PAUSE,
  CAST_PLAYER_PLAY,
  CLOSE_CAST_PLAYER,
  OPEN_CAST_PLAYER
} from '@store/actions/cast-player';

const INITIAL_STATE: ICastPlayerState = {
  isPlaying: false,
  isShowing: false,
  mediaPid: '',
  contentPid: '',
};

const castPlayerReducer = (state: ICastPlayerState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case OPEN_CAST_PLAYER:
      return {
        ...state,
        isShowing: true,
        mediaPid: action.payload.mediaPid,
        contentPid: action.payload.contentPid,
      };

    case CLOSE_CAST_PLAYER:
      return INITIAL_STATE;

    case CAST_PLAYER_PLAY:
      return {
        ...state,
        isPlaying: true
      };

    case CAST_PLAYER_PAUSE:
      return {
        ...state,
        isPlaying: false
      };

    default:
      return state;
  }
};

export default castPlayerReducer;
