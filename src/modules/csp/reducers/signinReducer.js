import {
  AUTH_CLEAR_LOGIN_ERROR_MESSAGE,
  AUTH_ERR_LOG_IN,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGOUT,
} from '../constants/auth';

const INITIAL_STATE = {
  user: {},
  token: null,
  loading: false,
  messages: '',
};
import { getDefaultModelValue } from '../../../libs/modelHelper';
import { model } from '../models/homeModel';
import { equalToId, setFunctionId } from '../../../libs/commonHelper';
// import { model } from '../models/signinModel';
// const INITIAL_STATE = getDefaultModelValue(model);
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGOUT: {
      return {
        ...INITIAL_STATE,
      };
    }
    case AUTH_CLEAR_LOGIN_ERROR_MESSAGE: {
      return {
        ...state,
        messages: '',
      };
    }
    case AUTH_LOGGING_IN:
      return {
        ...state,
        loading: true,

      };
    case AUTH_LOGGED_IN:
      // console.log('state2 = ', state, action.payload)
      const {
        user, _id, userName, fullName, isAdmin, token,
        moduleList, currentModuleId, functionList, currentFunctionId,
        currentFunctionName, currentFunctionUrl, currentFunctionActionList,
      } = action.payload;
      // console.log('action.payload signinReducer:', action.payload)
      return {
        ...state,

        moduleList,
        currentModuleId,

        user: user ? user : { _id, userName, fullName, isAdmin, token },
        account: {
          ...state.account,
          password: '',
        },
        status: 'authenticated',

        functionList,
        currentFunctionId,
        currentFunctionName,
        currentFunctionUrl,
        currentFunctionActionList,

        error: null,
        loading: false,
      };

    // return {
    //   ...state,
    //   // user: action.payload.user,
    //   // token: action.payload.token,
    //   token: action.payload.access_token,
    //   user: action.payload.user,
    //   loggingIn: false,
    // };
    case AUTH_ERR_LOG_IN:
      console.log('AUTH_ERR_LOG_IN :', state, action)
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
