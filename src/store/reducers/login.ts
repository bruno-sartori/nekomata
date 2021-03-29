// Constants
import {
  CLEAR_LOGIN,
  LOGIN_FAILURE,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
} from '@actions/login';

const INITIAL_STATE = {
  error: null,
  initialized: false,
  isRequesting: false,
  response: {},
};

const loginReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        initialized: true,
        isRequesting: false,
        response: action.payload,
      };

    case LOGIN_REQUESTING:
      return {
        ...state,
        isRequesting: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isRequesting: false,
        response: {},
      };

    case CLEAR_LOGIN:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default loginReducer;
