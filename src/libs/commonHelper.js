import { SESSION_JWT } from './constants/sessionKeys';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DATA_TYPE } from '../constants/dataType';
import _ from 'lodash';
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import { API_GATEWAY_URL, SEPARATE_STRING } from '../constants/config';
import { getRequestHeader } from './apiHelper'

export const SESSION_JWT_KEY = 'jwtToken';
export const SESSION_FUNCTION_ID_KEY = 'functionId';

export const LOADING_STATE = {
    loading: true,
    error: false,
    success: false,
    messages: '',
};
export const convertStringToArray = (text, seperator) => {
    if (!text) {
        return undefined;
    }

    const sep = seperator || ',';
    return text.replace(/\s/g, '').split(sep);
};
export const getInputValue = (data) => {
    const {
        type, name, value, checked, options,
    } = data;

    return {
        name,
        options,
        value: (type === 'radio' || type === 'checkbox') ? checked : value,
    };
};

export function getDefaultValue(dataType, defaultValue) {
    let value;

    if (!_.isUndefined(defaultValue)) {
        value = defaultValue;
    } else {
        switch (dataType) {
            case DATA_TYPE.ID: {
                value = null;
                break;
            }

            case DATA_TYPE.BOOLEAN:
            case DATA_TYPE.BOOL: {
                value = true;
                break;
            }

            case DATA_TYPE.ARRAY: {
                value = [];
                break;
            }

            case DATA_TYPE.OBJECT: {
                value = {};
                break;
            }

            case DATA_TYPE.DATE:
            case DATA_TYPE.DATE_TIME: {
                value = null;
                break;
            }

            case DATA_TYPE.STRING: {
                value = '';
                break;
            }

            default: {
                value = '';
                break;
            }
        }
    }

    return value;
}
// export const getToken = () => localStorage.getItem(SESSION_JWT);
export const getToken = async () => await AsyncStorage.getItem('access_token');
// export const removeToken = () => localStorage.removeItem(SESSION_JWT);
export const removeToken = async () => await AsyncStorage.removeItem('access_token');

export const setFunctionId = async functionId => await AsyncStorage.setItem(SESSION_FUNCTION_ID_KEY, functionId);

export const getFunctionId = async () => await AsyncStorage.getItem(SESSION_FUNCTION_ID_KEY);


export const checkAsyncStorage = async () => {
    const token = await AsyncStorage.getItem('access_token');
    // const user = await AsyncStorage.getItem('userData');
    return {
        token,
        // user: JSON.parse(user),
    };
};

export const getFieldAttribute = (self, name) => {
    const splitedNameList = name.split('.'); // fieldName.index.subFieldName
    const { model, query, object } = self.state;
    // console.log('name,model, query, object :', name, model, query, object)
    let fieldType;
    let fieldValue;
    if (splitedNameList.length < 3) { // single field or field with '$gt' / '$lt'
        fieldType = model[name];
        fieldValue = query ? query[name] : object[name];
    } else {
        const fieldName = splitedNameList[0];
        const index = splitedNameList[1];
        const subFieldName = splitedNameList[2];

        fieldType = model[fieldName].subModel[subFieldName];
        fieldValue = query ? query[fieldName][index][subFieldName] : object[fieldName][index][subFieldName];
    }

    return {
        fieldType,
        fieldValue,
    };
};
// async function getInfoAuth(access_token) {
//     return new Promise(async (resolve, reject) => {
//         axios({
//             method: 'GET',
//             url: `${API_GATEWAY_URL}/security/get_user_login`,
//             headers: await getRequestHeader(),
//         }).then(async (response) => {
//             console.log('respone :', response)
//             resolve(response);
//             // await AsyncStorage.setItem('access_token', response.data.access_token)
//             // .then(() => {
//             //     resolve(response);
//             //     AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
//             // });
//         }).catch(err => { console.log('err :', err.response); reject(err) });
//     });
// }
// const API_GATEWAY_URL = 'http://10.7.0.169:9094/api';
export const convert2DataText = (code, name) => code + SEPARATE_STRING + name;

export const convertDataList2OptionList = (objectList, keyField = '_id', codeField = 'code', nameField = '') => {
    const optionList = [];

    if (!_.isArray(objectList)) {
        // eslint-disable-next-line no-console
        console.error(`"objectList" is not an array so can not render field set (${keyField}, ${codeField}, ${nameField}) to list options.`);
        return optionList;
    }

    objectList.forEach((obj) => {
        const item = {};

        item.key = obj[keyField];
        item.value = obj[keyField];

        if (nameField !== '') {
            item.text = convert2DataText(obj[codeField], obj[nameField]);
        } else {
            item.text = obj[codeField];
        }

        optionList.push(item);
    });

    const item = {};
    // item.key = '';
    // item.value = 'null';
    // item.text = 'Chọn giá trị';
    optionList.push(item);

    return optionList;
};

function login(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_GATEWAY_URL}/v2/users/login`, {
            "credentials": {
                "userName": email,
                "password": password
            }
        }, {
            "headers": {
                "common": {},
                "content-type": "application/json"
            }
        }).then(async (response) => {
            await AsyncStorage.setItem('access_token', response.data.data.token)
            await AsyncStorage.setItem('user_id', response.data.data._id)
            await AsyncStorage.setItem('user_name', response.data.data.userName)
            await AsyncStorage.setItem('full_name', response.data.data.fullName)

            const { moduleList } = response.data.data;
            const moduleCode = (moduleList && (moduleList.length > 0)) ? moduleList[0].moduleCode : '';
            console.log('moduleCode : ', moduleCode)
            if (moduleCode) {
                resolve(response);
            } else {
                throw Exception();
            }
        }).catch(err => { console.log('commonHelper>>Login>>err :', err, err.response); reject(err.response ? err.response : err) });

    });
}
export const convertDataOptionList = (objectList) => {
    const optionList = [];
    if (!_.isArray(objectList)) {
        // eslint-disable-next-line no-console
        console.error(`"objectList" is not an array so can not render field set (${objectList}, ${codeField}, ${nameField}) to list options.`);
        return optionList;
    }
    return [{ text: 'Lựa chọn', key: 'all', value: 'all', children: objectList }]
}
async function logout(getState) {
    return new Promise(async (resolve, reject) => {
        try {
            const currentState = await getState();
            const { token } = currentState.system;
            // axios.post(`${API_LOGIN_URL}/user/logout`, {}, {
            //     headers: {
            //         authorization: `Bearer ${token}`,
            //     },
            // }).then(async (response) => {
            //     resolve(response);
            //     // await AsyncStorage.removeItem('userData');
            //     await AsyncStorage.removeItem('access_token');
            // }).catch(err => {
            //     console.log('eror logout :', err)
            //     reject(err)
            // }
            // );
            await AsyncStorage.removeItem('access_token').then(async (response) => {
                resolve(response);
            }).catch(err => {
                console.log('eror logout :', err)
                reject(err)
            }
            );
            console.log('logout success')
        } catch (error) {
            console.log('error : ', error)
        }
    });
}

export const userService = {
    login,
    logout,
};



export const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case "isEmail":
                isValid = isValid && emailValidator(val);
                break;
            case "minLength":
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case "equalTo":
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            case "notEmpty":
                isValid = isValid && notEmptyValidator(val);
                break;
            default:
                isValid = true;
        }
    }

    return isValid;
};

const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        val
    );
};

export const validateEmail = (emailAddress) => {
    const regularExpression = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
    return regularExpression.test(emailAddress);
};

export const validatePhone = str => (str ? str.length > 0 : false);

export const validateObjectId = id => ((typeof id !== 'undefined') && (id !== null) && (id !== '') && (id !== '0'));


const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

const notEmptyValidator = val => {
    return val.trim() !== "";
};




let _navigator;

export function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

export function navigate(routeName, params) {
    if (_navigator) {
        _navigator.dispatch(
            NavigationActions.navigate({
                routeName,
                params,
            }),
        );
    }
}

export const equalToId = (id, otherId) => {
    if (!id || !otherId) {
        return false;
    }

    return (id.toString() === otherId.toString());
};
export const containId = (objectList, lookUpId) => {
    if (_.isArray(objectList) && lookUpId) {
        return objectList.findIndex(f => equalToId(f, lookUpId)) > -1;
    }

    return false;
};
// export default {
//   navigate,
//   setTopLevelNavigator,
// };
