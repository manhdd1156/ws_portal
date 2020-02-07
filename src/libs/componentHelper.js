/*
 10/12/2019    FIT-ManhDD16     Created

*/
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import { createDraft, finishDraft } from 'immer';
import createCachedSelector from 're-reselect';
import { apiError2Messages } from './errorHelper';
import { createBrowserHistory } from 'history';
import { MODULE_CODE, API_GATEWAY_URL } from '../constants/config';
import { getDefaultModelValue } from '../libs/modelHelper';
import { apiGetList } from './apiHelper';

import {
  getToken, removeToken,
  getInputValue, getDefaultValue, convertDataList2OptionList, convertDataList2OptionListWithOutDuplicate,
  convertDataList2InstantSearchOptionList,
  setFunctionId,
  equalToId,
} from './commonHelper';


export const LOADING_STATE = {
  loading: true,
  error: false,
  success: false,
  messages: '',
};
export const REFRESHING_STATE = {
  loading: false,
  error: false,
  success: false,
  messages: '',
};
export const PermmissionPropType = PropTypes.shape({
  functionId: PropTypes.string,
  moduleId: PropTypes.string,
  functionActionList: PropTypes.array,

  canCreate: PropTypes.bool,
  canRead: PropTypes.bool,
  canUpdate: PropTypes.bool,
  canDelete: PropTypes.bool,
});

export const ObjectListPropType = PropTypes.shape({
  model: PropTypes.string,
  length: PropTypes.number,
  data: PropTypes.array,
  query: PropTypes.object,
});
export const PropsChildrenPropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
]);
export const bindComponentToContext = (componentList, context) => {
  if (_.isArray(componentList)) {
    componentList.forEach((component) => {
      component.contextType = context;
    });
  } else {
    componentList.contextType = context;
  }
};
export async function getList(self, apiEndpoint, query) {
  const { error, data } = await apiGetList(apiEndpoint, removeJunkValue(self, query));

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
      rowRef: [],
    });
  }
}

function mergeFieldOnChangeList(fieldDef, onChangeHandlerList) {
  if (fieldDef) {
    const onChangeHandler = fieldDef.onChange;

    if (_.isFunction(onChangeHandler)) {
      if (onChangeHandlerList.indexOf(onChangeHandler) < 0) {
        onChangeHandlerList.push(onChangeHandler);
      }
    }
  }
}

export const getLinkedObjects = (objectId, objectListData) => {
  const currentIndex = objectListData.findIndex(val => val._id.toString() === objectId.toString());
  const prevObjectId = (currentIndex > -1) && (currentIndex > 0) ? objectListData[currentIndex - 1]._id : '';
  const nextObjectId = (currentIndex > -1) && (currentIndex < (objectListData.length - 1)) ? objectListData[currentIndex + 1]._id : '';

  return {
    prevObjectId,
    nextObjectId,
  };
};
export async function onChange(self, data) {
  console.log("onChange : ", data)
  const currentState = self.state;

  const {
    isListComponent,
    query, object,
    model, pageLoad,
    modelName,
  } = currentState;
  const { name, value } = getInputValue(data);
  const changedFields = createDraft(isListComponent ? query : object);
  const splitedNameList = name.split('.'); // fieldName.index.subFieldName
  const onChangeHandlerList = []; // all handler called after related field changed

  if (splitedNameList.length < 3) { // single field or field with '$gt' / '$lt'
    changedFields[name] = value;

    mergeFieldOnChangeList(model[name], onChangeHandlerList);

    const selectedPageLoad = pageLoad[name];

    if (selectedPageLoad) { // Ref model is found => need to process related fields
      const { refKeyField, relatedFields } = selectedPageLoad;
      console.log('value');
      if (value) { // EU selected value
        const selectedItem = selectedPageLoad.data.find(item => equalToId(item[refKeyField], value));
        console.log('selectedPageLoad.data', value, selectedPageLoad.data);
        if (selectedItem && relatedFields) {
          relatedFields.forEach((field) => {
            if (_.isObject(field)) {
              const { fromField, toField, toPageLoad } = field;

              if (toField) {
                changedFields[toField] = selectedItem[fromField];
                mergeFieldOnChangeList(model[toField], onChangeHandlerList);
              } else if (toPageLoad) {
                pageLoad[toPageLoad] = { // create new pageLoad for related field
                  ...pageLoad[toPageLoad],
                  data: selectedItem[fromField],
                };
              }
            } else {
              changedFields[field] = selectedItem[field];
              mergeFieldOnChangeList(model[field], onChangeHandlerList);
            }
          });
        }
      } else if (relatedFields) { // EU didn't select value
        relatedFields.forEach((field) => {
          if (_.isObject(field)) {
            const { toField } = field;
            const toFieldDef = model[toField];

            changedFields[toField] = getDefaultValue(toFieldDef.type, toFieldDef.defaultValue);
            mergeFieldOnChangeList(model[toField], onChangeHandlerList);
          } else {
            const fieldDef = model[field];

            if (fieldDef) {
              changedFields[field] = getDefaultValue(fieldDef.type, fieldDef.defaultValue);
              mergeFieldOnChangeList(model[field], onChangeHandlerList);
            } else {
              console.error(`Field ${field} is NOT defined in model ${modelName}.`);
            }
          }
        });
      }
    }
  } else { // nested field
    const fieldName = splitedNameList[0];
    const index = splitedNameList[1];
    const subFieldName = splitedNameList[2];
    const fieldSubModel = model[fieldName] && model[fieldName].subModel ? model[fieldName].subModel : {};

    const changedItem = changedFields[fieldName][index];
    changedItem[subFieldName] = value;

    mergeFieldOnChangeList(fieldSubModel[subFieldName], onChangeHandlerList);

    // pageLoad[name] => nested instant search field with MANY pageLoad
    // pageLoad[`${fieldName}.${subFieldName}`] => nested instant search field with UNIQUE pageLoad
    const selectedPageLoad = (!_.isUndefined(pageLoad[name])) ? pageLoad[name] : pageLoad[`${fieldName}.${subFieldName}`];

    if (selectedPageLoad) { // Ref model is found
      const { refKeyField, relatedFields } = selectedPageLoad;

      if (value) { // EU selected value
        const selectedItem = selectedPageLoad.data ? selectedPageLoad.data.find(item => equalToId(item[refKeyField], value)) : undefined;

        if (selectedItem && relatedFields) {
          relatedFields.forEach((field) => {
            if (_.isObject(field)) { // exists { fromField: toField }
              const { fromField, toField, toPageLoad } = field;

              if (toField) {
                changedItem[toField] = selectedItem[fromField];
                mergeFieldOnChangeList(fieldSubModel[toField], onChangeHandlerList);
              } else if (toPageLoad) {
                pageLoad[`${fieldName}.${index}.${toPageLoad}`] = { // create new pageLoad for related field
                  ...pageLoad[`${fieldName}.${toPageLoad}`],
                  data: selectedItem[fromField],
                };
              }
            } else {
              changedItem[field] = selectedItem[field];
              mergeFieldOnChangeList(fieldSubModel[field], onChangeHandlerList);
            }
          });
        }
      } else if (relatedFields) { // EU didn't select value => clear realted field
        relatedFields.forEach((field) => {
          const fieldDef = fieldSubModel[subFieldName];

          if (_.isObject(field)) { // exists { fromField: toField }
            const { toField, toPageLoad } = field;

            if (toField) {
              changedItem[toField] = getDefaultValue(fieldDef.type, fieldDef.defaultValue);
              mergeFieldOnChangeList(fieldSubModel[toField], onChangeHandlerList);
            } else if (toPageLoad) {
              pageLoad[`${fieldName}.${index}.${toPageLoad}`] = {
                ...pageLoad[`${fieldName}.${toPageLoad}`],
                data: [],
              };
            }
          } else {
            changedItem[field] = getDefaultValue(fieldDef.type, fieldDef.defaultValue);
            mergeFieldOnChangeList(fieldSubModel[field], onChangeHandlerList);
          }
        });
      }
    }
  }

  let newState = finishDraft(changedFields);

  for (let i = 0; i < onChangeHandlerList.length; i += 1) {
    const func = onChangeHandlerList[i];
    // eslint-disable-next-line no-await-in-loop
    newState = await func(self, newState);
  }

  if (isListComponent) { // in list page
    self.setState({
      ...currentState,
      query: newState,
    });
  } else { // in form page
    self.setState({
      ...currentState,
      object: newState,
    });
  }
}

export async function onDeleteSubDocument(self, indexedFieldName) {
  console.log('onDeleteSubDocument :', indexedFieldName)
  const currentState = self.state;

  const {
    model, isListComponent,
    query, object,
    pageLoad,
  } = currentState;

  const changedFields = createDraft(isListComponent ? query : object);
  const splitedNameList = indexedFieldName.split('.'); // fieldName.index

  const fieldName = splitedNameList[0];
  const index = splitedNameList[1];
  const { subModel } = model[fieldName];
  const sparePartLength = changedFields[fieldName].length - 1;

  changedFields[fieldName].splice(index, 1);

  const newState = finishDraft(changedFields);

  // auto clone pageLoad to sub document pageLoad by its index
  Object.entries(subModel).forEach(([subFieldName, subFieldDef]) => {
    const { uniquePageLoad } = subFieldDef; // [!] ~Page[L]oad vs ~Page[l]oad is easy to make error

    if (uniquePageLoad) {
      for (let i = index; i < sparePartLength; i += 1) {
        pageLoad[`${fieldName}.${i}.${subFieldName}`] = { ...pageLoad[`${fieldName}.${i + 1}.${subFieldName}`] };
      }

      pageLoad[`${fieldName}.${sparePartLength}.${subFieldName}`] = undefined;
    }
  });

  if (isListComponent) { // in list page
    self.setState({
      ...currentState,
      query: {
        ...query,
        ...newState,
      },
    });
  } else { // in form page
    self.setState({
      ...currentState,
      object: {
        ...object,
        ...newState,
      },
    });
  }
}

export async function onAddSubDocument(self, fieldName) {
  // console.log('onAddSubDocument >> self,fieldName :)
  const currentState = self.state;

  const {
    isListComponent,
    query, object, model,
    pageLoad,
  } = currentState;

  const changedFields = createDraft(isListComponent ? query : object);
  const { subModel } = model[fieldName];
  const sparePartLength = changedFields[fieldName] ? changedFields[fieldName].length : 0;

  if (sparePartLength === 0) {
    changedFields[fieldName] = [getDefaultModelValue(subModel)];
  } else {
    changedFields[fieldName].unshift(getDefaultModelValue(subModel));
  }

  // auto clone pageLoad to sub document pageLoad by its index
  Object.entries(subModel).forEach(([subFieldName, subFieldDef]) => {
    const { uniquePageLoad } = subFieldDef; // [!] ~Page[L]oad vs ~Page[l]oad is easy to make error

    if (uniquePageLoad) {
      for (let i = sparePartLength; i > 0; i -= 1) {
        pageLoad[`${fieldName}.${i}.${subFieldName}`] = { ...pageLoad[`${fieldName}.${i - 1}.${subFieldName}`] };
      }

      pageLoad[`${fieldName}.0.${subFieldName}`] = { ...pageLoad[`${fieldName}.${subFieldName}`] };
    }
  });

  const newState = finishDraft(changedFields);

  if (isListComponent) { // in list page
    self.setState({
      ...currentState,
      query: {
        ...query,
        ...newState,
      },
    });
  } else { // in form page
    self.setState({
      ...currentState,
      object: {
        ...object,
        ...newState,
      },
    });
  }
}

export const listOptionsSelector = createCachedSelector(
  objectList => objectList,
  (objectList, keyField) => keyField,
  (objectList, keyField, codeField) => codeField,
  (objectList, keyField, codeField, nameField) => nameField,

  (objectList, keyField, codeField, nameField) => {
    if (objectList && objectList.data) {
      return convertDataList2OptionList(objectList.data, keyField, codeField, nameField);
    }
    return [];
  },
)((objectList, keyField, codeField, nameField, fieldName) => fieldName);

export const convertModuleList = (moduleList) => {
  if (moduleList) {
    let resultModules = [];
    let titles = [];
    console.log('moduleList : ', moduleList)
    // moduleList.map(async (object) => {
    //   if (titles.includes(object.moduleName) && object.moduleName !== '') { // nếu moduleName là rỗng thì k lấy vì nó chỉ là object title
    //     resultModules.map((objectExist) => {
    //       if (objectExist.title.includes(object.moduleName)) {
    //         objectExist.data.push(object)
    //       }
    //     })
    //   } else if (object.moduleName !== '') {
    //     titles.push(object.moduleName)
    //     resultModules.push({ title: object.moduleName, data: [object] })
    //   }
    // })
    moduleList.map(async (object) => {
      resultModules.push(object.moduleName)
    })
    return resultModules
  }
  return [];
}

export const convertFunctionList = (functionList) => {
  if (functionList) {
    let resultFunctions = [];
    let titles = [];
    functionList.map(async (object) => {
      if (titles.includes(object.functionParentName) && object.functionParentName !== '') { // nếu functionParentName là rỗng thì k lấy vì nó chỉ là object title
        resultFunctions.map((objectExist) => {
          if (objectExist.title.includes(object.functionParentName)) {
            objectExist.data.push(object)
          }
        })
      } else if (object.functionParentName !== '') {
        titles.push(object.functionParentName)
        resultFunctions.push({ title: object.functionParentName, data: [object] })
      }
    })
    return resultFunctions
  }
  return [];
}
export function removeJunkValue(self, query) {
  const nomalizedQuery = {};
  const { model } = self.state;
  let fieldType = '';
  Object.entries(query).forEach(([key, value]) => { // copy and reject null / empty / undefined values
    switch (value) {
      case undefined:
      case '':
      case null:
        break;

      case '0': // remove ID = 0 query
        fieldType = model[key] ? model[key].type : DATA_TYPE.STRING;

        if (fieldType !== DATA_TYPE.ID) {
          nomalizedQuery[key] = value;
        }
        break;

      default:
        if (['isDefaultQuery', 'hiddenFields'].indexOf(key) === -1) { // other fields
          nomalizedQuery[key] = value;
        }

        break;
    }
  });
  console.log('nomalizedQuery : ', nomalizedQuery)
  return nomalizedQuery;
}

export async function checkLogin(self) {
  const token = await getToken();
  console.log('token : ', token)

  if (!token) {
    // window.location.href = `/login/${encodeURIComponent(window.location.href)}`;
    self.props.onLogout();
  }

  const { status, handleReloginUserSuccess } = self.props;
  if (status !== 'authenticated') { //  || !user
    try {
      const data = {
        // moduleCode: MODULE_CODE,
        moduleCode: self.props.navigation.state.routeName.split('/')[1],
      };
      const result = await axios({
        method: 'POST',
        data,
        url: `${API_GATEWAY_URL}/v2/users/ping`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('step 1 self : ', self)
      // const history = createBrowserHistory();
      // console.log('history :', t)
      // const location = history.location.pathname;
      const location = self.props.navigation.state.routeName;
      const userData = result.data.data;
      const { currentModuleId, moduleList, functionList } = userData;

      let currentFunctionId = '';
      let currentFunctionName = '';
      let currentFunctionUrl = '';
      let currentFunctionActionList = '';

      const secondSlashPos = location.indexOf('/', 1);
      const thirdSlashPos = secondSlashPos > -1 ? location.indexOf('/', secondSlashPos + 1) : -1;
      let requestFunctionUrl = thirdSlashPos > -1 ? location.substring(0, thirdSlashPos + 1) : location;
      console.log('secondSlashPos,thirdSlashPos,requestFunctionUrl : ', secondSlashPos, thirdSlashPos, requestFunctionUrl)

      if (requestFunctionUrl !== '') {
        for (let i = 0; i < functionList.length; i += 1) {
          const {
            functionId,
            functionName,
            functionUrl,
            functionActionList,
          } = { ...functionList[i] };

          let nomalizedFunctionUrl = `/${functionUrl}/`;

          while (nomalizedFunctionUrl.indexOf('//') > -1) { // remove repeate slash character
            nomalizedFunctionUrl = nomalizedFunctionUrl.replace('//', '/');
          }

          requestFunctionUrl = `${requestFunctionUrl}/`;

          while (requestFunctionUrl.indexOf('//') > -1) { // remove repeate slash character
            requestFunctionUrl = requestFunctionUrl.replace('//', '/');
          }

          if (nomalizedFunctionUrl.length > 2) {
            if (requestFunctionUrl === nomalizedFunctionUrl) {
              currentFunctionId = functionId;
              currentFunctionName = functionName;
              currentFunctionUrl = functionUrl;
              currentFunctionActionList = functionActionList;
              break;
            }
          }
        }
      }
      // currentFunctionId = '545454545454545'
      setFunctionId(currentFunctionId);

      handleReloginUserSuccess(
        userData,

        moduleList,
        currentModuleId,

        functionList,
        currentFunctionId,
        currentFunctionName,
        currentFunctionUrl,
        currentFunctionActionList,
      );
      // console.log('seft :', self)
    } catch (error) {
      await removeToken();
      self.props.onLogout;
    }
  }
}