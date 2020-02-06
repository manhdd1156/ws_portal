/*
 14/12/2019    FIT-ManhDD16     Created

*/
import axios from 'axios';
import { API_GATEWAY_URL, API_UPIMAGE_URL, UNLIMITED_RETURNED_RESULT, ITEM_AMOUNT_PER_PAGE } from '../constants/config'
import humps from 'humps';
import qs from 'qs';
import pluralize from 'pluralize';
import { getToken, getFunctionId } from './commonHelper';
import FormData from 'form-data'
import _ from 'lodash';

const apiUrlOptions = {
    encode: false,
    arrayFormat: 'indices', // [!] using "brackets" makes merged value issue
};

export async function apiGetList(endPoint, query) {
    console.log(' endPoint,query : ', endPoint, query)
    if (query.limit === 0) {
        return {
            model: endPoint,
            data: [],
            query,
        };
    }

    let queryString = '?';
    const apiQuery = {};
    Object.entries(query).forEach(([key, value]) => { // copy and reject null / empty / undefined values
        if (['fields', 'orderBy'].indexOf(key) > -1) {
            if (_.isArray(value)) { // if ARRAY then CONVERT to NOT SPACED STRING
                apiQuery[key] = value.join(',').replace(/\s/g, '');
            } else {
                apiQuery[key] = value.replace(/\s/g, '');
            }
        } else { // other fields
            apiQuery[key] = value;
        }
    });
    if (apiQuery.page) {
        apiQuery.offset = (query.page - 1) * query.itemsPerPage;
        apiQuery.limit = query.itemsPerPage;
    } else {
        if (typeof query.offset === 'undefined') {
            apiQuery.offset = 0;
        } else {
            apiQuery.offset = query.offset;
        }

        if (typeof query.limit === 'undefined') {
            apiQuery.limit = UNLIMITED_RETURNED_RESULT;
        } else {
            apiQuery.limit = query.limit;
        }
    }
    apiQuery.itemsPerPage = undefined;
    apiQuery.page = undefined;
    queryString += qs.stringify(apiQuery, apiUrlOptions);
    return apiGet(endPoint, queryString);
}
export async function getRequestHeader() {

    const tokenFromStorage = await getToken();
    return {
        Authorization: `Bearer ${tokenFromStorage}`,
        'x-function-id': await getFunctionId(),
        // [!] TODO User-Agent / Content-Type / Accept
    };
}
export async function apiPost(endPoint, data) {
    try {
        const result = await axios({
            method: 'POST',
            data,
            url: `${API_GATEWAY_URL}/${endPoint}/`,
            headers: await getRequestHeader(),
        });

        return { data: result.data };
    } catch (error) {
        return { error: error.response ? error.response : error };
    }
}

export async function apiCreate(endPoint, data) {
    return apiPost(endPoint, data);
}
export async function apiGet(endPoint, queryString) {
    try {
        console.log('endPoint : ', endPoint)
        console.log('queryString : ', queryString)
        console.log('API_GATEWAY_URL : ', API_GATEWAY_URL)
        console.log('${API_GATEWAY_URL}/${endPoint}/${queryString} : ', `${API_GATEWAY_URL}/${endPoint}/${queryString}`)
        console.log('token : ', await getRequestHeader())
        const result = await axios({
            method: 'GET',
            url: `${API_GATEWAY_URL}/${endPoint}/${queryString}`,
            headers: await getRequestHeader(),
        });
        // console.log('result :', result)
        return { data: result.data };
    } catch (error) {
        console.log('errror : ', error)
        return { error: error.response ? error.response : error };
    }
}
export function convertModelName2ApiEndpoint(modelName) {
    return pluralize.plural(humps.camelize(modelName));
}

export async function apiUpdateImage(endPoint, object, images) {
    try {
        console.log('apiUpdateImage start time : ', new Date().getSeconds(), ':', new Date().getMilliseconds())
        let data = new FormData();
        let flag_ImgExist = false
        let newImages = [];
        images.map((image) => {
            if (image.id === '') {
                data.append('file',
                    { uri: Platform.OS === 'android' ? (image.url.includes('file:///') ? image.url.replace('file:///', 'file:/') : image.url) : image.url.replace('file://', ''), name: image.url.split('/').pop(), type: 'image/jpeg' }

                );
                flag_ImgExist = true;
            }
        })
        // console.log('images : ', images);
        // console.log('data : ', data);
        if (flag_ImgExist) {
            const resultUpImages = await axios({
                method: 'POST',
                url: API_UPIMAGE_URL,
                data,
            });
            resultUpImages.data.data.map((rerultObject) => {
                newImages.push(rerultObject.id);
            })
        }
        // console.log('newImages :', newImages)
        if (object.note_detail === null) {
            object.note_detail = ''
        }
        const result = await axios.post(`${API_GATEWAY_URL}/${endPoint}/${object.id}`, {
            "images": newImages,
            "note_detail": object.note_detail,
        }, { headers: await getRequestHeader() })
        console.log('apiUpdateImage end time : ', new Date().getSeconds(), ':', new Date().getMilliseconds())
        return result.data
    } catch (error) {
        console.log('errorrrrr : ', error)
        console.log('errorrrrr : ', error.request)
        return { error: error.response ? error.response : error };
    }

}
export async function apiUpload(fileList) {
    try {
        const tokenFromStorage = await getToken();
        const data = new FormData();

        /*
        const config = {
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total );
          }
        };
        */

        fileList.forEach((file) => {
            data.append(file.name, file);
        });

        const result = await axios({
            method: 'POST',
            data,
            url: `${API_GATEWAY_URL}/v2/files`,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${tokenFromStorage}`,
            },
        });

        return { data: result.data };
    } catch (error) {
        return { error: error.response ? error.response : error };
    }
}

export async function apiUpdateById(endPoint, data) {
    return apiUpdate(endPoint, data);
}
export async function apiUpdate(endPoint, data) {
    try {
        const result = await axios({
            method: 'PUT',
            data,
            url: `${API_GATEWAY_URL}/${endPoint}/${data._id}`,
            headers: await getRequestHeader(),
        });

        return { data: result.data };
    } catch (error) {
        return { error: error.response ? error.response : error };
    }
}
export async function apiUpdateReceiverById(endPoint, objectId, receiver, phone) {
    try {
        console.log('heeeeee')
        const result = await axios.post(`${API_GATEWAY_URL}/${endPoint}/${objectId}`, {
            "address_contact_name": receiver,
            "address_contact_phone": phone,
        }, { headers: await getRequestHeader() })
        return { data: result.data };
    } catch (error) {
        console.log('errorrrrr : ', error.request)
        return { error: error.response ? error.response : error };
    }
}
export async function apiUpdateNoteById(endPoint, objectId, note_detail) {
    try {
        console.log('heeeeee')
        const result = await axios.post(`${API_GATEWAY_URL}/${endPoint}/${objectId}`, {
            "note_detail": note_detail,
        }, { headers: await getRequestHeader() })
        return { data: result.data };
    } catch (error) {
        console.log('errorrrrr : ', error.request)
        return { error: error.response ? error.response : error };
    }
}
export async function apiGetById(endPoint, objectId, fields) {
    const query = fields ? `${objectId}?fields=${fields}` : objectId;

    return apiGet(endPoint, query);
}
export async function apiDeleteById(endPoint, id) {
    return apiDelete(endPoint, id);
}

export async function apiDelete(endPoint, id) {
    try {
        const result = await axios({
            method: 'DELETE',
            url: `${API_GATEWAY_URL}/${endPoint}/${id}`,
            headers: await getRequestHeader(),
        });

        return { data: result.data };
    } catch (error) {
        return { error: error.response ? error.response : error };
    }
}