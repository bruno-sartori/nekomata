// Services
import { getPatients } from '@services/patient';
import { authTokenSelector } from '@store/selectors/login';

// Constants
export const PATIENTS_REQUESTING = 'PATIENTS_REQUESTING';
export const PATIENTS_SUCCESS = 'PATIENTS_SUCCESS';
export const PATIENTS_FAILURE = 'PATIENTS_FAILURE';
export const CLEAR_PATIENTS = 'CLEAR_PATIENTS';

const getPatientsInfoSuccess = (payload) => ({
  type: PATIENTS_SUCCESS,
  payload
});

const getPatientsInfoFailure = (payload) => ({
  type: PATIENTS_FAILURE,
  payload
});

const getPatientsInfoRequesting = () => ({
  type: PATIENTS_REQUESTING
});

export function clearPatientsInfo() {
  return {
    type: CLEAR_PATIENTS
  }
};

export function getPatientsAction() {
  return async (dispatch: any, getState: () => any) => {
    try {
      await dispatch(getPatientsInfoRequesting());
      const response = await getPatients(authTokenSelector(await getState()));
      await dispatch(getPatientsInfoSuccess(response));
    } catch (error) {
      await dispatch(getPatientsInfoFailure(error));
    }
  };
}
