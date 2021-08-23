// Constants
import { CLOSE_CAST_PLAYER } from '@store/actions/cast-player';
import { 
  CHROMECAST_ACTIVE,
  CHROMECAST_ACTIVE_CAST_VIDEO,
  CHROMECAST_AVAILABLE,
  CHROMECAST_INACTIVE,
  CHROMECAST_UNAVAILABLE,
  CHROMECAST_VIDEO_STATE,
  SET_CHROMECAST_CONTENT,
  SET_CHROMECAST_MEDIA
} from '@store/actions/chromecast';

const INITIAL_STATE: IChromecastState = {
  deviceName: '',
  active: false,
  available: false,
  videoContent: {
    playerState: 'UNSTARTED',
    activeCastVideo: null,
    pid: '',
    duration: 0,
    currentTime: 0
  },
  content: null,
  media: null
};

const chromecastReducer = (state: IChromecastState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CHROMECAST_ACTIVE:
      return {
        ...state,
        active: true,
        deviceName: action.payload,
      };
    case CHROMECAST_INACTIVE:
      return {
        ...INITIAL_STATE,
        videoContent: state.videoContent
      };
    case CHROMECAST_AVAILABLE:
      return {
        ...state,
        available: true,
      };
    case CHROMECAST_UNAVAILABLE:
      return INITIAL_STATE;
    case CHROMECAST_VIDEO_STATE:
      return {
        ...state,
        videoContent: {
          ...state.videoContent,
          ...action.payload.content
        }
      };
    case CHROMECAST_ACTIVE_CAST_VIDEO:
      return {
        ...state,
        videoContent: {
          ...state.videoContent,
          activeCastVideo: action.payload
        }
      }
    case CLOSE_CAST_PLAYER:
      return {
        ...state,
        videoContent: INITIAL_STATE.videoContent
      }
    
    case SET_CHROMECAST_CONTENT:
      return {
        ...state,
        content: action.payload
      }

    case SET_CHROMECAST_MEDIA:
      return {
        ...state,
        media: action.payload
      }

    default:
      return state;
  }
};

export default chromecastReducer;
