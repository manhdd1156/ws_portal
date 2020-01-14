/* eslint-disable import/prefer-default-export */
import _ from 'lodash';

import { apiGet } from './apiHelper';
import { SWAGGER_TYPE } from './constants/swaggerConstant';

const MODEL_DEFINITION_PATH = '#/definitions/';

export const parseServiceSwagger = async (serviceCode) => {
  const { error, data } = await apiGet(`${serviceCode}/swagger`, '');

  if (error) {
    return ({ error });
  }

  const actionList = [];
  const { paths, definitions } = data;

  if (_.isObject(paths)) {
    Object.entries(paths).forEach(([path, methodList]) => { // surf pạth list
      if (_.isObject(methodList)) {
        Object.entries(methodList).forEach(([method, methodAttributes]) => { // surf method list
          const requestFieldList = [];
          const responseFieldList = [];
          const { operationId, parameters, responses } = methodAttributes;
          let modelName = '';
          let model = {};

          if (_.isArray(parameters)) {
            parameters.forEach((param) => { // surf parameters list
              if (param.in !== 'path') {
                const { schema } = param;

                if (!schema) { // pure value
                  requestFieldList.push({
                    name: param.name,
                    type: param.type,
                  });
                } else { // ref to data model
                  modelName = schema.$ref.replace(MODEL_DEFINITION_PATH, '');
                  model = data.definitions[modelName];

                  if (model) {
                    const { properties } = model;
                    if (_.isObject(properties)) {
                      Object.entries(properties).forEach(([name, fieldDef]) => {
                        requestFieldList.push({
                          name,
                          type: fieldDef.type,
                        });
                      });
                    }
                  }
                } // else if (!schema) {
              } // if (param['in'] !== 'path') {
            });
          } // if (_.isArray(methodAttributes.parameters)) {

          if (_.isObject(responses)) {
            switch (path) {
              case '/': // get List API
              case '/export': { // export list API
                const { schema } = responses['200'];

                if (schema) {
                  modelName = schema.properties.data.items.$ref.replace(MODEL_DEFINITION_PATH, '');
                  model = data.definitions ? data.definitions[modelName] : undefined;

                  if (model) {
                    const { properties } = model;
                    if (_.isObject(properties)) {
                      Object.entries(properties).forEach(([name, fieldDef]) => {
                        responseFieldList.push({
                          name,
                          type: fieldDef.type,
                        });
                      });
                    }
                  }
                }

                break;
              }

              default: { // other API
                const { schema } = responses['200'];

                if (schema) {
                  const responseSchema = schema.properties.data;

                  if (responseSchema.type === SWAGGER_TYPE.ARRAY) {
                    modelName = responseSchema.items.$ref.replace(MODEL_DEFINITION_PATH, '');
                  } else {
                    modelName = responseSchema.$ref.replace(MODEL_DEFINITION_PATH, '');
                  }

                  model = data.definitions ? data.definitions[modelName] : undefined;

                  if (model) {
                    const { properties } = model;
                    if (_.isObject(properties)) {
                      Object.entries(properties).forEach(([name, fieldDef]) => {
                        responseFieldList.push({
                          name,
                          type: fieldDef.type,
                        });
                      });
                    }
                  }
                }

                break;
              }
            } // switch (path)
          } // if (_.isObject(responses))

          actionList.push({
            actionCode: operationId,
            path,
            method,
            requestFieldList,
            responseFieldList,
            note: methodAttributes.summary || methodAttributes.description || '',
          });
        });
      }
    });
  }

  const modelName = serviceCode.substring(3); // TODO: bug if version > 9 (2 digits)
  const modelDef = definitions ? definitions[modelName] : undefined;
  const fieldList = [];

  if (_.isObject(modelDef)) {
    const { required, properties } = modelDef;

    Object.entries(properties).forEach(([fieldName, fieldDef]) => {
      fieldList.push({
        name: fieldName,
        type: fieldDef.type,
        required: required.findIndex(f => f === fieldName) >= 0,
      });
    });
  }

  return ({ actionList, fieldList });
};

