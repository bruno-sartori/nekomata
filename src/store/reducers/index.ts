import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import loginReducer from './login';

const reducers = combineReducers({
  login: loginReducer,
  form: formReducer,  
});

export default reducers;
