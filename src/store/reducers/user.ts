// Constants
import {
  CLEAR_USER_INFO,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTING,
  USER_INFO_SUCCESS,
} from '@actions/user';

const INITIAL_STATE = {
  error: null,
  isRequesting: false,
  data: {},
};

const userReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case USER_INFO_SUCCESS:
      return {
        ...state,
        error: null,
        isRequesting: false,
        data: action.payload,
      };

    case USER_INFO_REQUESTING:
      return {
        ...state,
        isRequesting: true,
      };

    case USER_INFO_FAILURE:
      return {
        ...state,
        error: action.error,
        isRequesting: false,
        data: {},
      };

    case CLEAR_USER_INFO:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;
