// Constants
import {
  CLEAR_PATIENTS,
  PATIENTS_FAILURE,
  PATIENTS_REQUESTING,
  PATIENTS_SUCCESS,
} from '@actions/patients';

const INITIAL_STATE = {
  error: null,
  isRequesting: false,
  data: {},
};

const userReducer = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case PATIENTS_SUCCESS:
      return {
        ...state,
        error: null,
        initialized: true,
        isRequesting: false,
        data: action.payload,
      };

    case PATIENTS_REQUESTING:
      return {
        ...state,
        isRequesting: true,
      };

    case PATIENTS_FAILURE:
      return {
        ...state,
        error: action.error,
        isRequesting: false,
        data: {},
      };

    case CLEAR_PATIENTS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default userReducer;
