import pluralize from 'pluralize';
import { createSelector } from 'reselect';
import { ACTION } from './constants/actionConstant';
// export const getStateName = (moduleName, modelName) => `${moduleName}_${modelName.replace('/', '_')}`;
export const getStateName = (moduleName, modelName) => `${moduleName}_${pluralize.plural(modelName.replace('/', '_'))}`;

// selectors
const getCurrentState = currentState => currentState;
const getSystemState = (currentState, systemState) => systemState;

// expensive calculation
const getFunctionProps = (currentState, systemState) => {
    const {
        currentFunctionId,
        currentFunctionName,
        currentFunctionUrl,
        currentModuleId,
        currentFunctionActionList,
        user,
        status,
    } = systemState;
    // console.log('currentState :', currentState)
    // console.log('systemState :', systemState)
    const functionActionList = currentFunctionActionList ? currentFunctionActionList.split(',') : [];

    const canCreate = functionActionList.indexOf(ACTION.CAN_CREATE) > -1;
    const canRead = functionActionList.indexOf(ACTION.CAN_READ) > -1;
    const canUpdate = functionActionList.indexOf(ACTION.CAN_UPDATE) > -1;
    const canDelete = functionActionList.indexOf(ACTION.CAN_DELETE) > -1;

    const canSend = functionActionList.indexOf(ACTION.CAN_SEND) > -1;
    const canApprove = functionActionList.indexOf(ACTION.CAN_APPROVE) > -1;
    const canProcess = functionActionList.indexOf(ACTION.CAN_PROCESS) > -1;
    const canFinish = functionActionList.indexOf(ACTION.CAN_FINISH) > -1;

    const canExport = functionActionList.indexOf(ACTION.CAN_EXPORT) > -1;

    const permmission = {
        canCreate,
        canRead,
        canUpdate,
        canDelete,

        canSend,
        canApprove,
        canProcess,
        canFinish,

        canExport,
    };

    const {
        modelName, models, apiEndpoint,
        queryList, selectedQueryId,
        query, defaultQuery, objectList,
        pageLoad,
        prevObjectId, objectId, nextObjectId, modalVisible, showCheckbox,rowRef
    } = currentState;
    // console.log('user info :', user)
    return {
        userId: user._id || '',
        userName: user.userName || '',
        isAdmin: user.isAdmin || false,
        userFullName: user.fullName || '',
        departmentList: user.departmentList || [],
        status,
        roleList: user.roleList || [],

        functionId: currentFunctionId,
        moduleId: currentModuleId,
        functionName: currentFunctionName || '',
        baseUrl: currentFunctionUrl || '',
        permmission,
        functionActionList,

        modelName,
        models,
        apiEndpoint,

        queryList,
        selectedQueryId,
        query,
        defaultQuery,
        objectList,
        pageLoad,

        prevObjectId,
        objectId,
        nextObjectId,
        modalVisible,
        showCheckbox,
        rowRef,
        actionList: [],
    };
};

export const stateSelector = createSelector(
    getCurrentState,
    getSystemState,

    getFunctionProps,
    (currentState, systemState, stateName) => stateName);

