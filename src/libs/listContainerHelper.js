
import { getStateName, stateSelector } from './containerHelper';
import { action as homeAction } from '../modules/home/actions/homeAction';

export const getStateProps = (state, moduleName, modelName) => {
  const stateName = getStateName(moduleName, modelName);
  return stateSelector(state[moduleName][stateName], state.system, stateName);
};

export const getDispatchProps = (dispatch, action) => ({
  handleReloginUserSuccess: (
    user,

    moduleList,
    currentModuleId,

    functionList,
    currentFunctionId,
    currentFunctionName,
    currentFunctionUrl,
    currentFunctionActionList,
  ) => dispatch(homeAction.reloginUserSuccess( // to call masterPage reducer
    user,

    moduleList,
    currentModuleId,

    functionList,
    currentFunctionId,
    currentFunctionName,
    currentFunctionUrl,
    currentFunctionActionList,
  )),

  handleSaveQueryState: (
    queryList,
    selectedQueryId,
    query,

    objectList,
    pageLoad,

    prevObjectId,
    objectId,
    nextObjectId,
  ) => dispatch(action.saveQueryState(
    queryList,
    selectedQueryId,
    query,

    objectList,
    pageLoad,

    prevObjectId,
    objectId,
    nextObjectId,
  )),
  onLogout: () => dispatch(homeAction.onLogout())
});
