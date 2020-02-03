/*
 1/12/2019    FIT-ManhDD16     Created

*/
import {
  AUTH_LOGGING_IN,
  AUTH_LOGGED_IN,
  AUTH_ERR_LOG_IN,
  AUTH_LOGOUT,
  AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
} from '../constants/auth';
import { userService } from '../../../libs/commonHelper';
import { apiError2Messages } from '../../../libs/errorHelper';
import { navigate } from '../../../libs/commonHelper';

export const loggedIn = data => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const clearLoginErrorMessage = () => ({
  type: AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
});

export const errorLogIn = errorMessage => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const loggingIn = () => ({
  type: AUTH_LOGGING_IN,
});

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const logout = () => async (dispatch, getState) => {
  await userService.logout(getState).then((res) => {
    dispatch(loggedOut());
  }).catch((err) => { console.log('errror : ', err) });
};

export const login = (authData) => (dispatch) => {
  console.log('login :', authData);
  dispatch(loggingIn());
  userService.login(authData.email, authData.password).then(async (res) => {
    dispatch(loggedIn(res.data.data))
    await navigate('App', {});
  }).catch((err) => {
    console.log('authAction>>login>>error :', err)
    dispatch(errorLogIn(apiError2Messages(err)));
  });
};
