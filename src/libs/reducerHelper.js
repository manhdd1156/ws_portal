import _ from 'lodash';
import { getDefaultModelValue } from '../libs/modelHelper';
import { DATA_TYPE } from '../constants/dataType';
import { ITEM_AMOUNT_PER_PAGE } from '../constants/config';
import { ACTIONS as HOME_ACTIONS, CHANGE_CURRENT_FUNCTION } from '../modules/csp/actions/homeAction';
import { SAVE_QUERY_STATE, SAVE_OBJECT_SURFFING_STATE } from './constants/actionConstant';
import { convertModelName2ApiEndpoint } from './apiHelper';
import { OPERATOR_SIGN } from './constants/mongoOperator';

/**
 * @desc create Redux initial state from using query / data model
 * @param {object} model
 * @return Redux initial state
 */

export function createInitalState(model) {
  const modelName = model.modelName ? convertModelName2ApiEndpoint(model.modelName) : '';
  const queryRefModels = [];
  const queryModel = {};

  const queryFields = [];
  const queryFieldsUndefined = typeof model.query.fields === 'undefined';

  const objectRefModels = [];
  const objectModel = {};
  const objectFields = [];

  Object.entries(model.data).forEach(([fieldName, fieldType]) => {
    const canQuery = fieldType.canQuery || false;
    const required = fieldType.required || false;
    const { defaultValue, options, onChange } = fieldType;
    const translated = fieldType.translated || false;
    const {
      type, refModelName,
      refQuery, refKeyField, relatedFields,
      autoPageLoad,
    } = fieldType;

    if (_.isArray(fieldType)) { // sub-model definition
      const subModelDef = fieldType[0];
      const subModel = {};

      if (subModelDef) {
        Object.entries(subModelDef).forEach(([subFieldName, subFieldType]) => {
          const subRefModelName = subFieldType.refModelName;

          if (subRefModelName) {
            const refModel = {
              fieldName: `${fieldName}.${subFieldName}`,
              modelName: convertModelName2ApiEndpoint(subRefModelName),
              query: subFieldType.refQuery,
              refKeyField: subFieldType.refKeyField,
              relatedFields: subFieldType.relatedFields,

              // [!] ~Page[L]oad vs ~Page[l]oad is easy to make error
              autoPageLoad: _.isUndefined(subFieldType.autoPageLoad) ? true : subFieldType.autoPageLoad,
              uniquePageLoad: _.isUndefined(subFieldType.uniquePageLoad) ? false : subFieldType.uniquePageLoad,
              onChange: subFieldType.onChange,
              translated: _.isUndefined(subFieldType.translated) ? false : subFieldType.translated,
            };

            objectRefModels.push(refModel);

            if (canQuery) {
              queryRefModels.push(refModel);
            }
          } // if (subFieldType.refModelName) {

          subModel[subFieldName] = _.omit(subFieldType, ['refKeyField', 'refModelName', 'refQuery', 'relatedFields']);
        });
      } // if (subModelDef) {

      objectModel[fieldName] = {
        type: DATA_TYPE.ARRAY,
        required,
        defaultValue,
        subModel,
        canQuery,
        options,
        translated,
      };
      if (canQuery) {
        queryModel[fieldName] = {
          type: DATA_TYPE.ARRAY,
          // required,
          // defaultValue,
          subModel,
        };

        if (queryFieldsUndefined) {
          queryFields.push(fieldName);
        }
      } // if (canQuery) {
    } else if (refModelName) { // field with ref model
      const normalizedModelName = convertModelName2ApiEndpoint(refModelName);

      objectRefModels.push({
        fieldName,
        modelName: normalizedModelName,
        query: refQuery,
        refKeyField,
        relatedFields,
        autoPageLoad: _.isUndefined(autoPageLoad) ? true : autoPageLoad,
        onChange,
        translated,
      });

      objectModel[fieldName] = {
        type,
        required,
        defaultValue,
        options,
        translated,
      };

      if (canQuery) {
        queryRefModels.push({
          fieldName,
          modelName: normalizedModelName,
          query: refQuery,
          refKeyField,
          relatedFields,
          autoPageLoad: _.isUndefined(autoPageLoad) ? true : autoPageLoad,
          onChange,
        });
        queryModel[fieldName] = {
          type,
          canQuery,
          translated,
        };

        if (queryFieldsUndefined) {
          queryFields.push(fieldName);
        }
      } // if (canQuery) {
    } else { // field with single data type
      objectModel[fieldName] = {
        type,
        required,
        defaultValue,
        options,
        onChange,
        translated,
      };

      if (canQuery) {
        if (type === DATA_TYPE.DATE || type === DATA_TYPE.DATE_TIME) { // auto create GREATER AND LESS THAN
          queryModel[fieldName] = { // redundancy to get its model
            type,
          };

          queryModel[`${fieldName}${OPERATOR_SIGN}gte`] = {
            type,
          };

          queryModel[`${fieldName}${OPERATOR_SIGN}lte`] = {
            type,
          };
        } else {
          queryModel[fieldName] = {
            type,
            options,
            translated,
          };
        }

        if (queryFieldsUndefined) {
          queryFields.push(fieldName);
        }
      } // if (canQuery) {
    }

    objectFields.push(fieldName);
  });

  // add non-system attribute into query model
  Object.entries(model.query).forEach(([fieldName, fieldType]) => {
    if (['fields', 'hiddenFields', 'page', 'itemsPerPage'].indexOf(fieldName) < 0) {
      queryModel[fieldName] = fieldType;
    }
  });
  if (queryFieldsUndefined) {
    queryModel.fields = {
      type: DATA_TYPE.ARRAY,
      defaultValue: queryFields,
    };
  } else {
    queryModel.fields = model.query.fields;
  }

  queryModel.hiddenFields = model.query.hiddenFields ? model.query.hiddenFields : { type: DATA_TYPE.ARRAY, defaultValue: [] };
  queryModel.page = { type: DATA_TYPE.NUMBER, defaultValue: 1 };
  queryModel.itemsPerPage = { type: DATA_TYPE.NUMBER, defaultValue: ITEM_AMOUNT_PER_PAGE };

  if (_.isUndefined(queryModel.active)) {
    queryModel.active = { type: DATA_TYPE.BOOLEAN, defaultValue: true }; // if NOT INJECTED => create full option value
  }

  const defaultQuery = getDefaultModelValue(queryModel);

  // eslint-disable-next-line prefer-destructuring
  let apiEndpoint = model.apiEndpoint;

  if (!apiEndpoint) {
    apiEndpoint = {
      create: `${modelName}`,
      read: `${modelName}`,
      update: `${modelName}`,
      delete: `${modelName}`,

      send: `${modelName}/send`,
      approve: `${modelName}/approve`,
      process: `${modelName}/process`,
      finish: `${modelName}/finish`,
      rate: `${modelName}/rate`,

      export: `${modelName}/export`,
    };
  }

  return {
    modelName,
    apiEndpoint,

    models: {
      query: {
        model: queryModel,
        refModels: queryRefModels,
      },
      object: {
        objectFields: objectFields.join(','),
        model: objectModel,
        refModels: objectRefModels,
      },
    },

    defaultQuery,
    queryList: [],
    selectedQueryId: '',
    query: defaultQuery,
    objectList: {},
    rowRef: [],
    prevObjectId: '',
    objectId: '',
    nextObjectId: '',
    modalVisible: false,
    showCheckbox: false,
    actionList: [],
  };
}

/**
 * @desc get new Redux state by current state and dispatched action
 * @param {object} state current Redux state
 * @param {array} ACTIONS action set
 * @param {action} action dispatched action
 * @return new Redux state
 */

export function getNewState(state, ACTIONS, action) {
  // console.log('action', action);
  switch (action.type) {
    case HOME_ACTIONS[CHANGE_CURRENT_FUNCTION]: { // change function => clear all query state
      const defaultQuery = _.cloneDeep(state.defaultQuery);

      return {
        ...state,
        query: defaultQuery,
        objectList: {},
      };
    }

    case ACTIONS[SAVE_QUERY_STATE]: {
      const {
        queryList, selectedQueryId,
        query, objectList,
        pageLoad,
        prevObjectId, objectId, nextObjectId,
      } = action.payload;

      return {
        ...state,
        queryList,
        selectedQueryId,
        query,
        objectList,
        pageLoad,

        prevObjectId,
        objectId,
        nextObjectId,
      };
    }

    case ACTIONS[SAVE_OBJECT_SURFFING_STATE]: {
      const { prevObjectId, objectId, nextObjectId, } = action.payload;

      return {
        ...state,
        prevObjectId,
        objectId,
        nextObjectId,
      };
    }

    default:
      return state;
  }
}

