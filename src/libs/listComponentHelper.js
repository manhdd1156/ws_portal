/*
 14/12/2019    FIT-ManhDD16     Created

*/
import React from 'react';
import _ from 'lodash';
import async from 'async';
import axios from 'axios';
import { API_GATEWAY_URL, ITEM_AMOUNT_PER_PAGE } from '../constants/config';
import { equalToId, getInputValue, convertStringToArray } from './commonHelper';
import { API_RESERVED_KEY } from './constants/apiConstant'
import { ACTION } from './constants/actionConstant';
import { createDraft, finishDraft } from 'immer';
import { apiError2Messages } from './errorHelper';
import { NavigationActions } from 'react-navigation';
import { apiGetList, apiCreate, apiGetById, apiDeleteById, apiUpdateImage, apiUpdateById, apiUpdateNoteById, apiUpdateReceiverById } from './apiHelper';
import Moment from 'moment';
import { parseServiceSwagger } from './swaggerHelper';
import {
    LOADING_STATE,
    REFRESHING_STATE,
    checkLogin,
    getList, getLinkedObjects,
    onChange,
    removeJunkValue,

} from './componentHelper';


export const QUERY_SERVICE = 'v2/queries';
export const STATE_OPTION_LIST = ['intransit', 'shipping,received', 'pending', 'completed', 'failed'];
import { OPERATOR_SIGN, OPERATOR_REPLACER } from './constants/mongoOperator';
export const currentDate = Moment(new Date()).utc().format('YYYY-MM-DD');

export const prevDate = Moment().subtract(3, 'days').format('YYYY-MM-DD')
export const initComponent = (self, props) => {
    self.state = getInitalStateFromProps(self, props);

    self.onModalSearch = onModalSearch.bind(self, self);
    
    self.onCloseRow = onCloseRow.bind(self, self);
    self.onSearch = onSearch.bind(self, self);
    self.onResetQuery = onResetQuery.bind(self, self);
    self.onChange = onChange.bind(self, self);
    self.onCreateNew = onCreateNew.bind(self, self);
    self.onClickFirstObject = onClickFirstObject.bind(self, self);
    self.onClickFunctionRegister = onClickFunctionRegister.bind(self, self);
    self.onObjectClick = onObjectClick.bind(self, self);
    self.onRedirect = onRedirect.bind(self, self);
    self.onSelectObject = onSelectObject.bind(self, self);
    self.onSelectAllObjectList = onSelectAllObjectList.bind(self, self);
    self.onItemsPerPageChange = onItemsPerPageChange.bind(self, self);

    self.onSaveQuery = onSaveQuery.bind(self, self);
    self.onDeleteQuery = onDeleteQuery.bind(self, self);
    self.onSetQueryAsDefault = onSetQueryAsDefault.bind(self, self);
    self.onRunAsQuery = onRunAsQuery.bind(self, self);


    self.onSortBy = onSortBy.bind(self, self);
    
    

};


const getInitalStateFromProps = (self, props) => {
    const {
        modelName, models, apiEndpoint,
        pageLoad,
        queryList, selectedQueryId,
        query, objectList, defaultQuery,
        prevObjectId, objectId, nextObjectId,
        objectUrlHandler, modalVisible, showCheckbox, rowRef
    } = props;
    const { model, refModels } = models.query;
    // console.log('models.query :', models.query)
    return {
        modelName,
        model,
        apiEndpoint,
        refModels,

        isListComponent: true,
        pageLoad: pageLoad || {},

        query: {
            ...query,
            queryName: '',
            isDefaultQuery: false,
        },

        defaultQuery,
        queryList,
        selectedQueryId,
        showAdvancedSearch: false,

        objectList,
        selectedAll: false,
        selectedObjectList: [],

        prevObjectId,

        goToObject: false,
        objectId,
        objectUrlHandler,

        nextObjectId,
        modalVisible,
        showCheckbox,
        rowRef,
        error: null,
        loading: false,
    };
};
function onModalSearch(self, event) {
    event.preventDefault();
    const { modalVisible } = self.state;
    self.setState({ modalVisible: !modalVisible });
}

function onCloseRow(self, id) {
    /*  self.rowRef là 1 array chứa các row trong list của màn hình
        Object.entries(self.rowRef) list danh sách theo dạng key - value 
    */
    const { rowRef } = self.state;
    if (Object.entries(rowRef)) {
        Object.entries(rowRef).map(([rowId, row]) => {
            if (rowId !== id) {
                row.closeRow();
            }
        })
    }
}

async function onSearch(self, event) {
    event.preventDefault();
    self.setState(LOADING_STATE);

    const { apiEndpoint, query } = self.state;

    const newQuery = { // [?] query.page = 1 => MAKE ERROR
        ...query,
        page: 1,
    };

    await getList(self, apiEndpoint.read, newQuery);
}

async function onSaveQuery(self) {
    
    const { query } = self.state;
    const { queryName, isDefaultQuery } = query;
    console.log("qqqqqq",queryName,query)
  
    const {
      userId, userName, userFullName,
      functionId, baseUrl, functionName,
    } = self.props;
  
    const messages = [];
  
    if (!queryName) {
      messages.push({
        name: 'queryName',
        message: VALIDATE_FAILURE,
      });
  
      self.setState({
        error: true,
        messages,
      });
  
      return;
    }
  
    self.setState(LOADING_STATE);
  
    const nomalizedQuery = {};
  
    Object.entries(query).forEach(([key, value]) => {
      if (QUERY_AUTO_ADDED_FIELD.indexOf(key) < 0 && value) {
        nomalizedQuery[key.replace(OPERATOR_SIGN, OPERATOR_REPLACER)] = value;
      }
    });
  
    const newQuery = {
      userId,
      userName,
      userFullName,
  
      functionId,
      functionUrl: baseUrl,
      functionName,
  
      queryName,
      isDefaultQuery,
      query: nomalizedQuery,
    };
  
    const { error } = await apiCreate(QUERY_SERVICE, newQuery);
  
    if (error) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(error),
      });
  
      return;
    }
  
    const savedQueryList = await apiGetList(QUERY_SERVICE, {
      userId,
      functionId,
      fields: ['_id', 'queryName', 'isDefaultQuery', 'query'],
      active: true,
    });

    console.log("ddddddd",savedQueryList)
    
    if (savedQueryList.error) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(savedQueryList.error),
      });
  
      return;
    }
  
    self.setState({
      loading: false,
      queryName: '',
      isDefaultQuery: false,
      queryList: savedQueryList.data.data,
    });
  }
  
  const onRedirect = (self) => {
    if (!self || !self.state) return null;
  
    const { baseUrl } = self.props;
    const { goToObject, objectId, objectUrlHandler } = self.state;
    const url = `${baseUrl}/${objectId}`.replace('//', '/');
  
    if (goToObject === true) {
      if (objectUrlHandler) {
        return objectUrlHandler(self);
      }
  
      return <Redirect to={url} />;
    }
  
    return null;
  };
  
  async function onSetQueryAsDefault(self, queryId, isDefaultQuery) {
    self.setState(LOADING_STATE);
  
    const { queryList } = self.state;
    let selectedQuery = {};
  
    if (isDefaultQuery) { // default => no set
      queryList.forEach((query) => {
        if (equalToId(query._id, queryId)) {
          query.isDefaultQuery = !isDefaultQuery;
          selectedQuery = query;
        }
      });
    } else { // not set => default
      queryList.forEach((query) => {
        if (equalToId(query._id, queryId)) {
          query.isDefaultQuery = !isDefaultQuery;
          selectedQuery = query;
        } else {
          query.isDefaultQuery = isDefaultQuery;
        }
      });
    }
  
    const { error } = await apiUpdateById(QUERY_SERVICE, selectedQuery); // TODO: auto unset other "isDefaultQuery" with same functionId & userId
  
    if (error) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(error),
      });
    } else {
      self.setState({
        loading: false,
        queryList,
        success: true,
        messages: 'system:msg.update.success',
      });
    }
  }

  async function onDeleteQuery(self, queryId) {
    self.setState(LOADING_STATE);
  
    const { error } = await apiDeleteById(QUERY_SERVICE, queryId); // TODO: delete NOT work
  
    if (error) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(error),
      });
    } else {
      self.setState({
        loading: false,
        queryList: self.state.queryList.filter(f => !equalToId(f._id, queryId)),
        success: true,
        messages: 'system:msg.delete.success',
      });
    }
  }
  
  async function onRunAsQuery(self, event, data) {
    event.preventDefault();
  
    const { query, queryList } = self.state;
    const { value } = getInputValue(data);
  
    if (value) {
      const selectedQuery = queryList.find(f => f._id, value);
  
      if (query) {
        self.setState({
          query: _.merge(query, selectedQuery.query),
          selectedQueryId: value,
        });
      }
    }
  }  


async function onResetQuery(self, event) {
    event.preventDefault();
    const { apiEndpoint, defaultQuery } = self.state;
    defaultQuery.itemsPerPage = ITEM_AMOUNT_PER_PAGE // thêm tạm thời, vì chưa biết được  defaultQuery.itemsPerPage bị thay đổi giá trị ở đâu.
    self.setState({
        ...LOADING_STATE,
        query: defaultQuery,
        selectedQueryId: '',
    });

    await getList(self, apiEndpoint.read, defaultQuery);
}
async function onClickFirstObject(self) {
    const {
        queryList, selectedQueryId,
        query, objectList, objectId,
        pageLoad,
    } = self.state;

    if (!objectId) {
        const { handleSaveQueryState } = self.props;
        const objectListData = objectList.data;
        const newObjectId = objectListData && (objectListData.length > 0) ? objectListData[0]._id.toString() : '';
        const nextObjectId = objectListData && (objectListData.length > 1) ? objectListData[1]._id.toString() : '';

        handleSaveQueryState(queryList, selectedQueryId, query, objectList, pageLoad, '', newObjectId, nextObjectId); // dispatch saveQueryState action to save [query, objectList]

        self.setState({ // redirect to object detail form
            ...self.state,
            goToObject: true,

            prevObjectId: '',
            objectId: newObjectId,
            nextObjectId,
        });
    } else {
        self.setState({ // redirect to object detail form
            ...self.state,
            goToObject: true,
        });
    }
}
// const onRedirect = (self) => {
//     if (!self || !self.state) return null;

//     const { baseUrl } = self.props;
//     const { goToObject, objectId, objectUrlHandler } = self.state;
//     const url = `${baseUrl}/detail`.replace('//', '/');
//     const params = objectId
//     console.log('url,goToObject,objectId : ', url, goToObject, objectId)
//     console.log('objectUrlHandler : ', objectUrlHandler)
//     if (goToObject === true) {
//         if (objectUrlHandler) {
//             return objectUrlHandler(self);
//         }

//         // return <Redirect to={url} />;
//         const navigateAction = NavigationActions.navigate({
//             routeName: url,
//             params: {
//                 id: objectId
//             }
//         });
//         self.props.navigation.dispatch(navigateAction);
//     }

//     return null;
// };
async function onObjectClick(self, objectId) {
    const {
        queryList, selectedQueryId,
        query, objectList,
        pageLoad,
    } = self.state;
    const { handleSaveQueryState } = self.props;
    const { prevObjectId, nextObjectId } = getLinkedObjects(objectId, objectList.data ? objectList.data : []);

    handleSaveQueryState(queryList, selectedQueryId, query, objectList, pageLoad, prevObjectId, objectId, nextObjectId); // dispatch saveQueryState action to save [query, objectList]

    self.setState({ // redirect to object detail form
        ...self.state,
        goToObject: true,

        prevObjectId,
        objectId,
        nextObjectId,
    });
}

const navigateToScreen = (route, functionId) => async () => {
    const navigateAction = NavigationActions.navigate({
        routeName: route
    });
    if (route === "/csp/dashboard/") {
        this.props.navigation.closeDrawer()
    }
    else if (route === "SignOut") {
        // console.log('============== :',this.props.navigation)
        await this.props.onLogout();
        // console.log('======.....')
        this.props.navigation.navigate('Auth');
    } else {
        this.props.handleChangeCurrentFunction(functionId);
        this.props.navigation.dispatch(navigateAction);
    }

}

async function onSortBy(self, fieldName) {
    self.setState(LOADING_STATE);
  
    const { apiEndpoint, query } = self.state;
    const sortBy = query.sortBy ? convertStringToArray(query.sortBy, '.') : [];
    const sortedField = sortBy[0] ? sortBy[0] : '';
    const sortDirection = sortBy[1] === 'desc' ? 'desc' : 'asc';
  
    query.page = 1; // reset to 1rst page when REsearch
  
    if (fieldName === sortedField) {
      query.sortBy = `${fieldName}.${sortDirection === 'desc' ? 'asc' : 'desc'}`;
    } else {
      query.sortBy = `${fieldName}.asc`;
    }
  
    await getList(self, apiEndpoint.read, query);
  }
  



async function onCreateNew(self) {
    const {
        queryList, selectedQueryId,
        query, objectList,
        pageLoad,
    } = self.state;
    const { handleSaveQueryState } = self.props;
    handleSaveQueryState(queryList, selectedQueryId, query, objectList, pageLoad, '', '0', ''); // dispatch saveQueryState action to save [query, objectList]

    self.setState({ // redirect to object detail form
        ...self.state,
        goToObject: true,

        prevObjectId: '',
        objectId: '0',
        nextObjectId: '',
    });
}

async function onSelectObject(self, data) {
    console.log('onSelectObject :', data)

    const { selectedObjectList } = self.state;
    const { name, value } = getInputValue(data);
    const newSelectedObjectList = Array.from(selectedObjectList); // [!] NOT create new Array make NOT RE-render

    if (value) {
        newSelectedObjectList.push(name);
    } else {
        _.remove(newSelectedObjectList, id => equalToId(id, name));
    }

    self.setState({
        selectedObjectList: newSelectedObjectList,
    });
}
async function onSelectAllObjectList(self, data) {

    const { objectList } = self.state;
    const { value } = getInputValue(data);
    const selectedObjectList = [];

    if (value && objectList && objectList.length) {
        objectList.data.forEach((o) => {
            selectedObjectList.push(o._id);
        });
    }

    self.setState({
        selectedAll: value,
        selectedObjectList,
    });
}
export const QUERY_AUTO_ADDED_FIELD = [
    'fields',
    'hiddenFields',
    'page',
    'itemsPerPage',
    'queryName',
    'isDefaultQuery',
    'sortBy',
    'groupBy',
];
export async function loadComponentData(self) {
    const {
        apiEndpoint,
        refModels,
        query,
        objectId,
    } = self.state;
    if (self.state.refreshing) {
        self.setState(REFRESHING_STATE)
    } else {
        self.setState(LOADING_STATE);
    }
    await checkLogin(self);
    // console.log('self.state : ', self.state)
    console.log('preDate = ', prevDate)
    console.log('currendate = ', currentDate)
    console.log('permmission = ', self.props.permmission)
    let resultSearch = false;
    const taskList = [];
    const { actionList, permmission } = self.props;
    if (permmission.canDelete) {
        actionList.push({
            actionCode: 'deleteSelectedItem',
            actionName: 'Xóa', // TODO: fix language hardcode
            actionHandler: deleteSelectedItem,
        });
    }
    console.log('refModels : ', refModels)
    refModels.forEach((tmpModel) => {
        if (tmpModel.autoPageLoad) {
            taskList.push(async (cb) => {
                const { error, data } = await apiGetList(tmpModel.modelName, removeJunkValue(self, tmpModel.query));

                if (error) {
                    cb(error);
                } else {
                    const pageLoad = {
                        fieldName: tmpModel.fieldName,
                        data: data.data,
                    };

                    cb(null, pageLoad);
                }
            });
        } // if (tmpModel.autoPageLoad)
    });
    console.log('taskList : ', taskList)
    await async.series(taskList, async (err, loadedRefData) => {
        if (err) {
            self.setState({
                error: true,
                messages: apiError2Messages(err),
                loading: false,
            });
        } else {
            let defaultQuery = null;
            let queryList = [];
            let mergedQuery = query;
            let selectedQueryId = '';

            const { userId, functionId } = self.props;
            console.log('step 1 :(userId && functionId,query :', userId, functionId, query)
            if (userId && functionId) { // TODO: fix CAN NOT GET { userId, functionId } if app reload by F5
                console.log('step 2')
                const savedQueryList = await apiGetList(QUERY_SERVICE, {
                    userId,
                    functionId,
                    fields: ['_id', 'queryName', 'isDefaultQuery', 'query'],
                    active: true,
                });
                console.log('step 3 savedQueryList : ', savedQueryList)
                if (!savedQueryList.error) {
                    queryList = savedQueryList.data.data;

                    defaultQuery = queryList.find(f => f.isDefaultQuery);
                    const nomilizedQuery = {};

                    if (_.isObject(defaultQuery)) {
                        Object.entries(defaultQuery.query).forEach(([key, value]) => {
                            nomilizedQuery[key.replace(OPERATOR_REPLACER, OPERATOR_SIGN)] = value;
                        });

                        mergedQuery = _.merge(query, nomilizedQuery);
                        selectedQueryId = defaultQuery._id;
                    }
                }
            }
            console.log('step 5 :', mergedQuery)
            const { error, data } = await apiGetList(apiEndpoint.read, removeJunkValue(self, mergedQuery));
            console.log('step 6')
            if (error) {
                self.setState({
                    error: true,
                    messages: apiError2Messages(error),
                    loading: false,
                });
            } else {
                const pageLoad = {};

                if (_.isArray(loadedRefData)) { // convert array to object to easy access
                    loadedRefData.forEach((refData) => {
                        pageLoad[refData.fieldName] = refData;
                    });
                }
                console.log('is done loading data!')
                self.setState({
                    loading: false,
                    pageLoad,
                    objectList: data,
                    resultSearch: true,
                    queryList,
                    query: mergedQuery,
                    selectedQueryId,

                    prevObjectId: '',
                    objectId,
                    nextObjectId: '',
                    modalVisible: false,
                    showCheckbox: false,
                    rowRef: [],
                });
            }
        }
    });


    // let listObject = [];
    // let newQuery = '';
    // let resultSearch = false;
    // if (currentScreen.includes('Detail')) {
    //     const { error, route_order } = await apiGetById(apiEndpoint.readOne, objectId); // TODO: Only get model's field set

    //     if (error) {
    //         self.setState({
    //             error: true,
    //             messages: apiError2Messages(error),
    //             loading: false,
    //         });
    //         return;
    //     } else {
    //         // console.log('index,route_order = ', index, route_order)

    //         // if (index === 0 && route_order.state === 'shipping') { // pending
    //         //     let newError = { status: 404, data: '' }
    //         //     self.setState({
    //         //         error: true,
    //         //         // messages: apiError2Messages(newError),
    //         //         loading: false,
    //         //     });
    //         //     return;
    //         // }
    //         self.setState({
    //             loading: false,
    //             object: route_order,
    //             objectId,
    //         });
    //     }
    // } else { //currentScreen is orderList
    //     await Promise.all(STATE_OPTION_LIST.filter(item => item.state !== 'reject').map(async (state, index) => {
    //         newQuery = `from_date=${(state !== 'pending' && state !== 'completed') ? prevDate : currentDate}&to_date=${currentDate}&states=${state}&offset=0&limit=15&asc=${state === 'completed' ? false : true}`; //asc= true = > cũ nhất lên đầu
    //         // console.log('newQuery :', newQuery)
    //         // console.log('state :', state)
    //         let result = (await apiGetList(apiEndpoint.read, newQuery)).orders;
    //         listObject[index] = await convertObjectList(result)
    //         return Promise.resolve('ok')
    //     }))
    //     const newTotal = await getCountOrder(apiEndpoint.count, prevDate, currentDate, 'orderList')
    //     // console.log('newTotal :', newTotal)
    //     // console.log('self.state.index :', self.state.index)
    //     // console.log('newTotal[self.state.index] :', newTotal[self.state.index])
    //     if (newTotal[self.state.index].total > 0) {
    //         resultSearch = true;
    //     }
    //     self.setState({
    //         ...self.state,
    //         loading: false,
    //         resultSearch: resultSearch,
    //         objectList: listObject,
    //         objectListTotal: newTotal
    //     });
    //     console.log('end')
    // }
}
export const deleteSelectedItem = async (self) => {
    self.setState(LOADING_STATE);

    const { selectedObjectList, apiEndpoint, query } = self.state;
    const errorList = [];

    selectedObjectList.forEach(async (objectId) => {
        const { error } = await apiDeleteById(apiEndpoint.delete, objectId);

        if (error) {
            errorList.push(error);
        }
    });

    if (errorList.length > 0) {
        self.setState({
            loading: false,
            error: true,
            messages: 'msg.delete.failure',
        });

        return;
    }

    // [?] query.page = 1 => MAKE ERROR
    const newQuery = {
        ...query,
        page: 1,
    };

    const { error, data } = await apiGetList(apiEndpoint.read, removeJunkValue(self, newQuery));

    if (error) {
        self.setState({
            query, // [!] fix onChange with 2rd 3th.. page
            error: true,
            success: false,
            messages: apiError2Messages(error),
            loading: false,
        });
    } else {
        self.setState({
            query, // [!] fix onChange with 2rd 3th.. page
            loading: false,
            objectList: data,
            prevObjectId: '',
            objectId: '',
            nextObjectId: '',
            modalVisible: false,
            showCheckbox: false,
            selectedObjectList: [],
        });
    }
};
async function onItemsPerPageChange(self, data) {
    self.setState(LOADING_STATE);
    console.log('data : ', data)
    const { apiEndpoint, query } = self.state;

    // query.page = 1;
    query.itemsPerPage = data.value;

    await getList(self, apiEndpoint.read, query);
}

async function onClickFunctionRegister(self) {
    self.setState(LOADING_STATE);

    const {
        modelName, baseUrl,
        functionId, functionName, functionActionList,
    } = self.props;

    const functionUrl = baseUrl;
    const serviceNameList = [];
    const serviceActionList = [];
    const serviceList = [];
    const { object, query } = self.props.models;
    const { objectFields } = object;
    const objectFieldsArray = objectFields ? objectFields.split(',') : [];
    const pascalize = str => pluralize.singular(_.upperFirst(str.substring(str.indexOf('/') + 1))); // convert "v2/purchaseOrderRequisitions" => "PurchaseOrderRequisition"
    let hasError = false;
    const errorMessageList = [];

    const convertQueryToRequestFieldList = (modelQuery) => {
        const requestFieldList = [];

        Object.entries(_.omit(modelQuery, API_RESERVED_KEY)).forEach(([key]) => {
            requestFieldList.push(key);
        });

        return requestFieldList;
    };

    serviceNameList.push(modelName);

    functionActionList.forEach((functionAction) => {
        const pascalizedServiceName = pascalize(modelName);

        switch (functionAction) {
            case ACTION.CAN_READ: {
                serviceActionList.push({
                    modelName,
                    actionCode: `get${pascalizedServiceName}List`,
                    requestFieldList: objectFieldsArray,
                    responseFieldList: objectFieldsArray,
                });

                serviceActionList.push({
                    modelName,
                    actionCode: `get${pascalizedServiceName}ById`,
                    requestFieldList: objectFieldsArray,
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_CREATE: {
                serviceActionList.push({
                    modelName,
                    actionCode: `create${pascalizedServiceName}`,
                    requestFieldList: objectFieldsArray,
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_UPDATE: {
                serviceActionList.push({
                    modelName,
                    actionCode: `update${pascalizedServiceName}ById`,
                    requestFieldList: objectFieldsArray,
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_DELETE: {
                serviceActionList.push({
                    modelName,
                    actionCode: `delete${pascalizedServiceName}ById`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_EXPORT: {
                serviceActionList.push({
                    modelName,
                    actionCode: `export${pascalizedServiceName}`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_SEND: {
                serviceActionList.push({
                    modelName,
                    actionCode: `send${pascalizedServiceName}ById`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_APPROVE: {
                serviceActionList.push({
                    modelName,
                    actionCode: `approve${pascalizedServiceName}ById`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_PROCESS: {
                serviceActionList.push({
                    modelName,
                    actionCode: `process${pascalizedServiceName}ById`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            case ACTION.CAN_FINISH: {
                serviceActionList.push({
                    modelName,
                    actionCode: `finish${pascalizedServiceName}ById`,
                    requestFieldList: [],
                    responseFieldList: objectFieldsArray,
                });

                break;
            }

            default: {
                serviceActionList.push({
                    modelName,
                    actionCode: `${functionAction}${pascalizedServiceName}ById`,
                    requestFieldList: objectFieldsArray,
                    responseFieldList: objectFieldsArray,
                });

                break;
            }
        }
    });

    if (object && _.isArray(object.refModels)) {
        object.refModels.forEach((m) => {
            const { modelName, query } = m;
            const { fields } = query;
            const pascalizedServiceName = pascalize(modelName);
            const responseFieldList = _.isArray(fields) ? fields : convertStringToArray(fields);

            if ((serviceNameList.indexOf(modelName) < 0 && (modelName.indexOf('*.') < 0))) { // skip virtual model with sign '*.' prefix
                serviceNameList.push(modelName);

                serviceActionList.push({
                    modelName,
                    actionCode: `get${pascalizedServiceName}List`,
                    requestFieldList: _.concat(convertQueryToRequestFieldList(query), responseFieldList),
                    responseFieldList,
                });
            }
        });
    }

    if (query && _.isArray(query.refModels)) {
        query.refModels.forEach((m) => {
            const { modelName, query } = m;
            const { fields } = query;
            const responseFieldList = _.isArray(fields) ? fields : convertStringToArray(fields);
            const pascalizedServiceName = pascalize(modelName);

            if (serviceNameList.indexOf(modelName) < 0) {
                serviceNameList.push(modelName);

                serviceActionList.push({
                    modelName,
                    actionCode: `get${pascalizedServiceName}List`,
                    requestFieldList: _.concat(convertQueryToRequestFieldList(query), responseFieldList),
                    responseFieldList, // [!] TODO: check query fields much more than object fields??
                });
            }
        });
    }

    // console.log('serviceNameList', serviceNameList);
    // console.log('serviceActionList', serviceActionList);

    // register service list
    for (let i = 0; i < serviceNameList.length; i += 1) {
        const serviceCode = serviceNameList[i];

        const query = {
            serviceCode,
            limit: 1,
            active: true,
            fields: '_id, serviceCode, serviceName, actionList, fieldList',
            exact: 'serviceCode',
        };

        const getServiceResult = await apiGetList('v2/services', query);

        if (getServiceResult.error) {
            // self.setState({
            //   loading: false,
            //   error: true,
            //   messages: apiError2Messages(getServiceResult.error),
            // });

            // return;

            hasError = true;

            errorMessageList.push({
                name: `apiGetList('v2/services', ${serviceCode})`,
                message: apiError2Messages(getServiceResult.error),
            });
            continue;
        }

        const service = getServiceResult.data.data[0];

        if (service) {
            serviceList.push(service);
        } else { // if (service)
            const swaggerResult = await parseServiceSwagger(serviceCode);

            if (swaggerResult.error) {
                // self.setState({
                //   loading: false,
                //   error: true,
                //   messages: apiError2Messages(swaggerResult.error),
                // });

                // return;

                hasError = true;

                errorMessageList.push({
                    name: `parseServiceSwagger(${serviceCode})`,
                    message: apiError2Messages(swaggerResult.error),
                });
                continue;
            }

            const createdService = {
                serviceCode,
                serviceName: serviceCode,
                actionList: swaggerResult.actionList,
                fieldList: swaggerResult.fieldList,
                active: true,
            };

            const creationResult = await apiCreate('v2/services', createdService);

            if (creationResult.error) {
                // self.setState({
                //   loading: false,
                //   error: true,
                //   messages: apiError2Messages(creationResult.error),
                // });

                // return;

                hasError = true;

                errorMessageList.push({
                    name: `apiCreate('v2/services', ${serviceCode})`,
                    message: apiError2Messages(creationResult.error),
                });
                continue;
            }

            serviceList.push(creationResult.data.data);
        } // if (service)
    } // for (let i = 0; i < serviceActionList.length; i += 1)

    // console.log('server ServiceList', serviceList);

    // register policy
    for (let i = 0; i < serviceActionList.length; i += 1) {
        const {
            modelName, actionCode,
            requestFieldList, responseFieldList,
        } = serviceActionList[i];

        const service = serviceList.find(s => s.serviceCode === modelName);
        const serviceId = service._id;

        const {
            serviceCode, serviceName,
            actionList, fieldList,
        } = service;

        const action = service.actionList.find(a => a.actionCode === actionCode);

        if (!action) {
            // self.setState({
            //   loading: false,
            //   error: true,
            //   messages: `Tài nguyên ${modelName} không có hành động ${actionCode}!`,
            // });

            // return;

            hasError = true;
            errorMessageList.push({
                name: `const action =  service.actionList.find(a => a.actionCode === ${actionCode})`,
                message: `Tài nguyên ${modelName} không có hành động ${actionCode}!`,
            });
            continue;
        }

        const actionId = action._id;
        const { path, method } = action;

        if (!action) {
            // self.setState({
            //   loading: false,
            //   error: true,
            //   messages: `Tài nguyên ${modelName} hành động ${actionCode} không tìm được actionId!`,
            // });

            // return;

            hasError = true;
            errorMessageList.push({
                name: 'const actionId = action._id',
                message: `Tài nguyên ${modelName} hành động ${actionCode} không tìm được actionId!`,
            });
            continue;
        }

        const query = {
            functionId,
            serviceId,
            actionId,

            limit: 1,
            active: true,
            fields: '_id, policyName',
        };

        const getPolicyResult = await apiGetList('v2/policies', query);

        // console.log('getPolicyResult', getPolicyResult);

        if (getPolicyResult.error) {
            // self.setState({
            //   loading: false,
            //   error: true,
            //   messages: apiError2Messages(getPolicyResult.error),
            // });

            // return;

            hasError = true;
            errorMessageList.push({
                name: `apiGetList('v2/policies', { functionId: ${functionId}, serviceId: ${serviceId}, actionId: ${actionId}})`,
                message: apiError2Messages(getPolicyResult.error),
            });
            continue;
        }

        const policy = getPolicyResult.data.data[0];

        if (policy) {
            serviceList.push(service);
        } else { // if (service)
            const createdPolicy = {
                policyName: `${functionName} - ${actionCode}`,

                functionId,
                functionUrl,
                functionName,

                serviceId,
                serviceCode,
                serviceName,
                actionList,
                fieldList,

                userFeatureList: [],

                actionId,
                actionCode,
                path,
                method,

                fullRequestFieldList: fieldList,
                requestFieldList,
                requestExceptFieldList: [],
                allowedRequestFieldList: requestFieldList,

                fullResponseFieldList: fieldList,
                responseFieldList,
                responseExceptFieldList: [],
                allowedResponseFieldList: responseFieldList,

                recordFeatureList: [],

                active: true,
            };

            const creationResult = await apiCreate('v2/policies', createdPolicy);

            if (creationResult.error) {
                // self.setState({
                //   loading: false,
                //   error: true,
                //   messages: apiError2Messages(creationResult.error),
                // });

                // return;

                hasError = true;

                errorMessageList.push({
                    name: `apiCreate('v2/policies', { policyName: ${functionName} - ${actionCode} })`,
                    message: apiError2Messages(creationResult.error),
                });
                continue;
            }
        } // if (policy)
    } // for (let i = 0; i < serviceActionList.length; i += 1)

    if (hasError) {
        self.setState({
            loading: false,
            error: true,
            messages: errorMessageList,
        });
    } else {
        self.setState({
            loading: false,
            success: true,
            messages: 'system:msg.register.success',
        });
    }
}