import {
  ACTIONS,
  RELOGIN_USER_SUCCESS,
  CHANGE_CURRENT_FUNCTION,
} from '../actions/homeAction';

import { getDefaultModelValue } from '../../../libs/modelHelper';
import { model } from '../models/homeModel';
import { equalToId, setFunctionId } from '../../../libs/commonHelper';

const INITIAL_STATE = getDefaultModelValue(model);

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS[RELOGIN_USER_SUCCESS]: {
      const {
        user,
        moduleList, currentModuleId,
        functionList, currentFunctionId, currentFunctionName, currentFunctionUrl, currentFunctionActionList,
      } = action.payload;
      // console.log('action.payload home:', action.payload)
      return {
        ...state,

        moduleList,
        currentModuleId,

        user,
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
    }

    case ACTIONS[CHANGE_CURRENT_FUNCTION]: {
      const newFunctionId = action.payload;
      const { currentFunctionId, functionList } = state;
      const currentFunction = functionList.find(f => equalToId(f.functionId, newFunctionId));
      setFunctionId(newFunctionId);

      return {
        ...state,
        prevFunctionId: !equalToId(newFunctionId, currentFunctionId) ? currentFunctionId : state.prevFunctionId,

        currentFunctionId: newFunctionId,
        currentFunctionName: currentFunction.functionName,
        currentFunctionUrl: currentFunction.functionUrl,
        currentFunctionActionList: currentFunction.functionActionList,

        error: null,
      };
    }

    default:
      return state;
  }
}
