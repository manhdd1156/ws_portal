// import humps from 'humps';
import { ACTION_STATES, SAVE_QUERY_STATE, SAVE_OBJECT_SURFFING_STATE } from './constants/actionConstant';

export function createActionTypeKey(modelName, actionName) {
  return `${modelName}_${actionName}`;
}

export function createActionType(model, otherActionStates = []) {
  const fullActionList = ACTION_STATES.concat(otherActionStates);
  const nomalizedModelName = String(model).toUpperCase(); // humps.decamelize(model)

  return fullActionList.reduce((acc, action) => {
    acc[action] = createActionTypeKey(nomalizedModelName, action);
    return acc;
  }, {});
}

export function createAction(ACTIONS) {
  return {
    saveQueryState: (queryList, selectedQueryId, query, objectList, pageLoad, prevObjectId, objectId, nextObjectId) => ({
      type: ACTIONS[SAVE_QUERY_STATE],
      payload: {
        queryList,
        selectedQueryId,
        query,
        objectList,
        pageLoad,

        prevObjectId,
        objectId,
        nextObjectId,
      },
    }),

    saveObjectSurffingState: (prevObjectId, objectId, nextObjectId) => ({
      type: ACTIONS[SAVE_OBJECT_SURFFING_STATE],
      payload: {
        prevObjectId,
        objectId,
        nextObjectId,
      },
    }),
  };
}

