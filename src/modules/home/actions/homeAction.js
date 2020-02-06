/*
 10/12/2019    FIT-ManhDD16     Created

*/
import { createActionTypeKey } from '../../../libs/actionHelper';

export const RELOGIN_USER_SUCCESS = 'RELOGIN_USER_SUCCESS';
export const CHANGE_CURRENT_FUNCTION = 'CHANGE_CURRENT_FUNCTION';
import { logout } from "./authAction";

const ACTION_STATES = [
  RELOGIN_USER_SUCCESS,
  CHANGE_CURRENT_FUNCTION,
];

function createActionType() {
  return ACTION_STATES.reduce((acc, action) => {
    acc[action] = createActionTypeKey('SYSTEM', action);
    return acc;
  }, {});
}

export const ACTIONS = createActionType(ACTION_STATES);

export const action = {
  reloginUserSuccess: (
    user,

    moduleList,
    currentModuleId,

    functionList,
    currentFunctionId,
    currentFunctionName,
    currentFunctionUrl,
    currentFunctionActionList,
  ) => (
      {
        type: ACTIONS[RELOGIN_USER_SUCCESS],
        payload: {
          user,

          moduleList,
          currentModuleId,

          functionList,
          currentFunctionId,
          currentFunctionName,
          currentFunctionUrl,
          currentFunctionActionList,
        },
      }),

  changeCurrentFunction: functionId => ({ type: ACTIONS[CHANGE_CURRENT_FUNCTION], payload: functionId }),
  onLogout: () => dispatch(logout())
};
