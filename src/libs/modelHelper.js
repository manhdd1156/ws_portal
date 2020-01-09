import _ from 'lodash';
import { validatePhone, validateEmail, getDefaultValue, validateObjectId } from './commonHelper';
import { DATA_TYPE } from '../constants/dataType';
import { VALIDATE_FAILURE } from '../constants/config';

export function getDefaultModelValue(model) {
  const defaultValue = {};

  Object.entries(model).forEach(([key, def]) => {
    if (_.isArray(def)) {
      defaultValue[key] = getDefaultValue(DATA_TYPE.ARRAY, def.defaultValue);
    } else {
      defaultValue[key] = getDefaultValue(def.type, def.defaultValue);
    }
  });
  return defaultValue;
}

export function nomalizeData(model, data) {
  const nomalizedData = {};
  const defaultValue = getDefaultModelValue(model);

  Object.entries(defaultValue).forEach(([key, value]) => {
    if (typeof data[key] === 'undefined') {
      nomalizedData[key] = value;
    } else if (_.isArray(data[key])) {
      const tmpSrcArray = data[key];

      if (tmpSrcArray.length > 0 && _.isObject(tmpSrcArray[0])) { // only add index field if Array of Object
        const tmpDestArray = [];

        for (let i = 0; i < tmpSrcArray.length; i += 1) {
          if (_.isObject(tmpSrcArray[i])) {
            tmpSrcArray[i].index = i + 1;
          }
          tmpDestArray.push(tmpSrcArray[i]);
        }

        nomalizedData[key] = tmpDestArray;
      } else {
        nomalizedData[key] = data[key];
      }
    } else {
      nomalizedData[key] = data[key];
    }
  });

  return nomalizedData;
}


export function validateData(model, objectData) {
  let errors = [];
  let hasError = false;

  try {
    Object.entries(model).forEach(([fieldName, def]) => {
      const { required, type } = def;
      const fieldValue = objectData[fieldName];
      let valid = true;

      if (required) {
        if (typeof fieldValue === 'undefined') {
          valid = false;
        } else {
          switch (type) {
            case DATA_TYPE.ARRAY: {
              if (fieldValue.length === 0) {
                valid = false;
              }

              break;
            }

            case DATA_TYPE.ID: {
              if (fieldName !== '_id') { // not check ID value
                valid = validateObjectId(fieldValue);
              }

              break;
            }

            case DATA_TYPE.STRING:
            case DATA_TYPE.NUMBER:
            case DATA_TYPE.DATE:
            case DATA_TYPE.DATE_TIME: {
              if (!fieldValue) {
                valid = false;
              }

              break;
            }

            default: {
              if (typeof fieldValue === 'undefined') {
                valid = false;
              }

              break;
            }
          }
        }
      }

      if (fieldValue) { // always check if field valud exists
        switch (type) {
          case DATA_TYPE.EMAIL:
            valid = validateEmail(fieldValue);
            break;

          case DATA_TYPE.PHONE:
            valid = validatePhone(fieldValue);
            break;

          case DATA_TYPE.ARRAY: {
            const { subModel } = def;

            if (subModel) {
              if (_.isArray(fieldValue)) {
                for (let i = 0; i < fieldValue.length; i += 1) {
                  const line = fieldValue[i];
                  const { error } = validateData(subModel, line);

                  if (error) {
                    errors = _.concat(errors, error);

                    hasError = true;
                    // valid = false;
                  }
                }
              }
            }

            break;
          }

          default:
            break;
        }
      }

      if (!valid) {
        errors.push({
          name: fieldName,
          message: VALIDATE_FAILURE,
        });

        hasError = true;
      }
    });

    if (hasError) {
      return { error: errors };
    }

    return { data: objectData };
  } catch (error) {
    // console.log('validateData.catch', error);
    return { error };
  }
}

