/*
 14/12/2019    FIT-ManhDD16     Created

*/
import React from 'react';
import _ from 'lodash';
import async from 'async';
import axios from 'axios';
import { API_GATEWAY_URL, ITEM_AMOUNT_PER_PAGE } from '../constants/config';
import { createDraft, finishDraft } from 'immer';
import { apiError2Messages } from './errorHelper';
import { NavigationActions } from 'react-navigation';
import { apiGetList, apiCreate, apiGetById, apiDeleteById, apiUpdateImage, apiUpdateById, apiUpdateNoteById, apiUpdateReceiverById } from './apiHelper';
import Moment from 'moment';
import {
    LOADING_STATE,
    REFRESHING_STATE,
    checkLogin,
    getList, getLinkedObjects,
    onChange,
    removeJunkValue,

} from './componentHelper';

import {
    // getToken, removeToken,
    getInputValue, getDefaultValue,
    // convertDataList2OptionList, convertDataList2OptionListWithOutDuplicate,
    // convertDataList2InstantSearchOptionList,
    // setFunctionId,
    equalToId,
} from './commonHelper';

export const QUERY_SERVICE = 'v2/queries';
export const STATE_OPTION_LIST = ['intransit', 'shipping,received', 'pending', 'completed', 'failed'];
import { OPERATOR_SIGN, OPERATOR_REPLACER } from './constants/mongoOperator';
export const currentDate = Moment(new Date()).utc().format('YYYY-MM-DD');

export const prevDate = Moment().subtract(3, 'days').format('YYYY-MM-DD')
export const initComponent = (self, props) => {
    self.state = getInitalStateFromProps(self, props);

    self.onModalSearch = onModalSearch.bind(self, self);
    // self.onSearch = onSearch.bind(self);
    self.onCloseRow = onCloseRow.bind(self, self);
    self.onSearch = onSearch.bind(self, self);
    self.onResetQuery = onResetQuery.bind(self, self);
    self.onChange = onChange.bind(self, self);
    self.onCreateNew = onCreateNew.bind(self, self);
    self.onObjectClick = onObjectClick.bind(self, self);
    self.onRedirect = onRedirect.bind(self, self);
    self.onSelectObject = onSelectObject.bind(self, self);
    self.onSelectAllObjectList = onSelectAllObjectList.bind(self, self);
    self.onItemsPerPageChange = onItemsPerPageChange.bind(self, self);

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

const onRedirect = (self) => {
    if (!self || !self.state) return null;

    const { baseUrl } = self.props;
    const { goToObject, objectId, objectUrlHandler } = self.state;
    const url = `${baseUrl}/detail`.replace('//', '/');
    const params = objectId
    console.log('url,goToObject,objectId : ', url, goToObject, objectId)
    console.log('objectUrlHandler : ', objectUrlHandler)
    if (goToObject === true) {
        if (objectUrlHandler) {
            return objectUrlHandler(self);
        }

        // return <Redirect to={url} />;
        const navigateAction = NavigationActions.navigate({
            routeName: url,
            params: {
                id: objectId
            }
        });
        self.props.navigation.dispatch(navigateAction);
    }

    return null;
};
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

