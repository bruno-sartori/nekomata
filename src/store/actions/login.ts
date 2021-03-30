// Services
import { signIn } from '@services/login';

// Constants
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
});

const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload
});

const loginRequesting = () => ({
  type: LOGIN_REQUESTING
});

export function clearLogin() {
  return {
    type: CLEAR_LOGIN
  }
};

export function loginAction(loginFormFields: ILoginFormFields, callback: any) {
  return async (dispatch: any, getState: () => any) => {
    try {
      await dispatch(loginRequesting());
      const response = await signIn(loginFormFields);
      await dispatch(loginSuccess(response));
      return callback();
    } catch (error) {
      await dispatch(loginFailure(error));
      return callback(error);
    }
  };
}
