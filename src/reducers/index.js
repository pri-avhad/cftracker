import { combineReducers } from 'redux';
import auth1 from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer,
  alerts,
  auth1,
  navigation,
  register,
});
