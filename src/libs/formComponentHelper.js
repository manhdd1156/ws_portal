/*
 14/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React from 'react';
import _ from 'lodash';
import async from 'async';
// import { Redirect } from 'react-router-dom';

import { apiGetList, apiGetById, apiCreate, apiDeleteById, apiUpdateById, apiUpload, apiPost, apiUpdate } from './apiHelper';
import { validateData, getDefaultModelValue, nomalizeData } from './modelHelper';
import { apiError2Messages } from './errorHelper';
// import { Toast } from 'native-base'

import {
  LOADING_STATE,
  checkLogin,
  getLinkedObjects,
  onChange, onAddSubDocument, onDeleteSubDocument,
  onDownloadFile,
} from './componentHelper';

async function onClickNextObject(self, event) {
  event.preventDefault();
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, model, objectFields,
    nextObjectId, objectList,
  } = self.state;

  const { handleSaveObjectSurffingState } = self.props;

  const objectId = nextObjectId;

  if (objectId && (objectId !== '0')) {
    const { err2, data } = await apiGetById(apiEndpoint.read, objectId, objectFields);

    if (err2) {
      self.setState({
        error: true,
        messages: err2.errors ? err2.errors : err2,
        loading: false,
      });
    } else {
      const linkedObjects = getLinkedObjects(objectId, objectList.data ? objectList.data : []);

      handleSaveObjectSurffingState(linkedObjects.prevObjectId, objectId, linkedObjects.nextObjectId); // dispatch saveQueryState action to save [query, objectList]

      self.setState({
        loading: false,
        object: nomalizeData(model, data.data),
        prevObjectId: linkedObjects.prevObjectId,
        objectId,
        nextObjectId: linkedObjects.nextObjectId,
      });
    }
  }
}

async function onClickPrevObject(self, event) {
  event.preventDefault();
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, model, objectFields,
    prevObjectId, objectList,
  } = self.state;

  const { handleSaveObjectSurffingState } = self.props;

  const objectId = prevObjectId;

  if (objectId && (objectId !== '0')) {
    const { error, data } = await apiGetById(apiEndpoint.read, objectId, objectFields); // TODO: Only get model's field set

    if (error) {
      self.setState({
        error: true,
        loading: false,
        messages: apiError2Messages(error),
      });
    } else {
      const linkedObjects = getLinkedObjects(objectId, objectList.data ? objectList.data : []);

      handleSaveObjectSurffingState(linkedObjects.prevObjectId, objectId, linkedObjects.nextObjectId); // dispatch saveQueryState action to save [query, objectList]

      self.setState({
        loading: false,
        object: nomalizeData(model, data.data),
        prevObjectId: linkedObjects.prevObjectId,
        objectId,
        nextObjectId: linkedObjects.nextObjectId,
      });
    }
  }
}

async function onGoBack(self) {
  self.setState({
    ...self.state,
    goToObjectList: true,
  });
}

async function onCreate(self) {
  // event.preventDefault();
  self.setState(LOADING_STATE);
  const {
    apiEndpoint, model, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
  } = self.state;

  const { error, data } = validateData(model, object);
  if (error) {
    self.setState({
      loading: false,
      success: false,
      error: true,
      messages: error,
    });
    return;
  }

  const result = await apiCreate(apiEndpoint.create, data);
  const error2 = result.error;
  if (error2) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error2),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',

      object: {
        ...object,
        _id: result.data.data._id,
      },
    });
    self.props.navigation.goBack();
  }
}

async function onCreateAndSend(self, event) {
  event.preventDefault();
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, model, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
  } = self.state;

  const { error, data } = validateData(model, object);

  if (error) {
    self.setState({
      loading: false,
      success: false,
      error: true,
      messages: error,
    });
    return;
  }

  const result2 = await apiCreate(apiEndpoint.create, data);
  const error2 = result2.error;

  if (error2) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error2),
    });
  } else {
    const objectId = result2.data.data._id;
    const result3 = await apiUpdate(`${apiEndpoint.send}`, { _id: objectId });

    if (result3.error) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(result3.error),
      });
    } else {
      self.setState({
        goToObjectList: gotoObjectListAfterSubmit || false,
        goToNextStep: gotoNextAfterSubmit || false,
        loading: false,
        success: true,
        messages: 'system:msg.update.success',
      });
    }
  }
}

async function onUpdate(self) {
  self.setState(LOADING_STATE);
  const {
    apiEndpoint, model, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
  } = self.state;

  const { error, data } = validateData(model, object);
  if (error) {
    self.setState({
      loading: false,
      success: false,
      error: true,
      messages: error,
    });
    return;
  }

  const result = await apiUpdateById(apiEndpoint.update, data);
  const error2 = result.error;
  if (error2) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error2),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
    self.props.navigation.goBack();
  }
}

// async function onDelete(self) {

//   self.setState({ deleting: true });
// }

async function onDeleteConfirm(self) {
  self.setState(LOADING_STATE);
  const { apiEndpoint, object } = self.state;
  const { error } = await apiDeleteById(apiEndpoint.delete, object._id);

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      loading: false,
      goToObjectList: true,
      success: true,
      messages: 'system:msg.delete.inprocess',
    });
    self.props.navigation.goBack();
  }
}

// async function onDeleteCancle(self) {
//   self.setState({ deleting: false });
// }

async function onClickObjectList(self, event) {
  event.preventDefault();

  self.setState({
    ...self.state,
    goToObjectList: true,
  });
}

async function onClickCopyObject(self, event) {
  event.preventDefault();

  const { objectId, object } = self.state;
  const { location, history, document } = window;
  const currentUrl = location.href;

  if (history.pushState) {
    history.pushState(history.state, document.title, currentUrl.replace(objectId, '0'));
  }

  // setState to copy current object
  self.setState({
    ...self.state,
    object: {
      ...object,
      _id: '0',
    },

    objectId: '0',
    prevObjectId: '',
    nextObjectId: '',

    gotoObjectCopyForm: true,
  });

  // setState to prevent reload again
  self.setState({ gotoObjectCopyForm: false });
}

const onRedirect = (self) => {
  if (!self || !self.state) return null;

  const { baseUrl } = self.props;
  const {
    goToObjectList, gotoObjectCopyForm,
    goToNextStep, nextUrlHandler,
  } = self.state;
  if (goToObjectList) {
    self.props.navigation.goBack();
  } else if (gotoObjectCopyForm) {
    // return <Redirect to={`${baseUrl}/0`} />;
  } else if (goToNextStep) {
    return nextUrlHandler(self);
  }

  return null;
};

async function onChangeComment(self, e, d) {
  e.preventDefault();

  // TODO: add UPLOAD and TAG feature

  self.setState({
    ...self.state,
    comment: d.value,
  });
}

async function onSend(self) {

  self.setState(LOADING_STATE);
  console.log('onSend !!!')
  const {
    apiEndpoint, objectId,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
  } = self.state;

  const result = await apiUpdate(`${apiEndpoint.send}`, { _id: objectId });
  const { error } = result;

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
    self.props.navigation.goBack();
  }
}

async function onApprove(self, accepted) {
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, objectId, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
    approvalNoteFieldName,
  } = self.state;

  const note = approvalNoteFieldName ? object[approvalNoteFieldName] || '' : '';
  const result = await apiUpdate(`${apiEndpoint.approve}`, { _id: objectId, accepted, note });
  const { error } = result;

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
  }
}

async function onAccept(self, e) {
  e.preventDefault();

  await onApprove(self, true);
}

async function onReject(self, e) {
  e.preventDefault();

  await onApprove(self, false);
}

async function onProcess(self) {
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, objectId, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
    processDescriptionFieldName,
  } = self.state;

  const processDescription = processDescriptionFieldName ? object[processDescriptionFieldName] || '' : '';
  const result = await apiUpdate(`${apiEndpoint.process}`, { _id: objectId, processDescription });
  const { error } = result;

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
  }
}

async function onFinish(self, accepted) {
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, objectId, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
    processDescriptionFieldName,
  } = self.state;

  const processDescription = processDescriptionFieldName ? object[processDescriptionFieldName] || '' : '';
  const result = await apiUpdate(`${apiEndpoint.finish}`, { _id: objectId, accepted, processDescription });
  const { error } = result;

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
  }
}

async function onRate(self) {
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, objectId, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
    rateFieldName,
  } = self.state;

  const rate = rateFieldName ? object[rateFieldName] || 5 : 5;
  const result = await apiUpdate(`${apiEndpoint.rate}`, { _id: objectId, rate });
  const { error } = result;

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else {
    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',
    });
  }
}
function onModal(self) {
  const { modalVisible } = self.state;
  self.setState({ modalVisible: !modalVisible });
}

async function onSendComment(self) {
  self.setState(LOADING_STATE);

  const { state } = self;
  const {
    modelName,
    objectId, comment,
  } = state;

  const postedData = {
    subject: 'send a comment',
    content: comment,
    relatedModel: modelName,
    relatedDocumentId: objectId,
    refUrl: '', // `/${moduleConfig.moduleCode}/${stateName}/${objectId}`,

    followerList: [],
  };

  const result = await apiPost('v2/comments', postedData);

  if (result.error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(result.error),
    });

    return;
  }
  const query = {
    fields: '_id, content, createdAt, createdBy, createdByUserName, createdByFullName',
    active: true,
    relatedModel: modelName,
    relatedDocumentId: objectId,
    sortBy: 'createdAt.desc',
  };

  const { error, data } = await apiGetList('v2/comments', query);

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });

    return;
  }

  self.setState({
    ...state,
    loading: false,
    comment: '',

    pageLoad: {
      ...state.pageLoad,
      commentList: {
        fieldName: 'commentList',
        data: data.data,
      },
    },
  });
}

async function onUploadFile(self, uploadedFileList, fileListName) {
  self.setState(LOADING_STATE);

  const { data, error } = await apiUpload(uploadedFileList);

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });
  } else if (data) {
    const addedFileList = Array.from(this.state.object[fileListName]);

    data.data.forEach((file) => {
      addedFileList.push({
        fileId: file.id,
        fileName: file.filename,
        originalName: file.originalname,
        contentType: file.contentType,
        size: file.size,
        bucketName: file.bucketName,
        uploadDate: file.uploadDate,
      });
    });

    self.setState({
      loading: false,
      object: {
        ...this.state.object,
        [fileListName]: addedFileList,
      },
    });
  } else {
    self.setState({
      loading: false,
    });
  }
}

const getInitalStateFromProps = (props) => {
  const {
    modelName, models, apiEndpoint,
    objectList,
    prevObjectId, objectId, nextObjectId,
    gotoObjectListAfterSubmit,
    gotoNextAfterSubmit, nextUrlHandler,
    afterObjectLoaded, afterNewObjectLoaded,
    approvalNoteFieldName,
    processDescriptionFieldName,
    rateFieldName,
  } = props;

  const { model, refModels, objectFields } = models.object;
  return {
    modelName,
    model,
    apiEndpoint,

    objectFields,
    refModels,
    afterObjectLoaded,
    afterNewObjectLoaded,

    isListComponent: false,
    pageLoad: {},
    object: getDefaultModelValue(model),

    objectList,
    gotoObjectListAfterSubmit: (_.isBoolean(gotoObjectListAfterSubmit) ? gotoObjectListAfterSubmit : true), // can not use as default fail
    goToObjectList: false,

    goToPrevObject: false,
    prevObjectId,

    gotoObjectCopyForm: false,
    objectId: objectId || props.navigation.getParam('id'),

    gotoNextAfterSubmit: gotoNextAfterSubmit || false,
    goToNextStep: false,
    nextUrlHandler,

    goToNextObject: false,
    nextObjectId,

    comment: '',
    approvalNoteFieldName,
    processDescriptionFieldName,
    rateFieldName,
    modalVisible: false,
    error: null,
    loading: false,
    deleting: false,
  };
};

export const initComponent = (self, props) => {
  self.state = getInitalStateFromProps(props);

  self.onChange = onChange.bind(self, self);
  self.onCreate = onCreate.bind(self, self);
  self.onUpdate = onUpdate.bind(self, self);
  // self.onDelete = onDelete.bind(self, self);
  self.onDeleteConfirm = onDeleteConfirm.bind(self, self);
  // self.onDeleteCancle = onDeleteCancle.bind(self, self);
  self.onModal = onModal.bind(self, self);
  self.onSend = onSend.bind(self, self);
  // self.onCreateAndSend = onCreateAndSend.bind(self, self);
  // self.onAccept = onAccept.bind(self, self);
  // self.onReject = onReject.bind(self, self);
  // self.onProcess = onProcess.bind(self, self);
  // self.onFinish = onFinish.bind(self, self);
  // self.onRate = onRate.bind(self, self);
  // self.onApprove = onApprove.bind(self, self);

  self.onAddSubDocument = onAddSubDocument.bind(self, self);
  self.onDeleteSubDocument = onDeleteSubDocument.bind(self, self);

  // self.onUploadFile = onUploadFile.bind(self, self);
  // self.onDownloadFile = onDownloadFile.bind(self, self);

  self.onGoBack = onGoBack.bind(self, self);
  // self.onClickNextObject = onClickNextObject.bind(self, self);
  // self.onClickPrevObject = onClickPrevObject.bind(self, self);
  // self.onClickObjectList = onClickObjectList.bind(self, self);
  // self.onClickCopyObject = onClickCopyObject.bind(self, self);
  self.onRedirect = onRedirect.bind(self, self);

  // self.onChangeComment = onChangeComment.bind(self, self);
  // self.onSendComment = onSendComment.bind(self, self);
};

export const getTitleProps = (self) => {
  const {
    state,
    onClickObjectList,
    onClickCopyObject,
    onClickPrevObject,
    onClickNextObject,
  } = self;

  const { functionName, prevObjectId, nextObjectId } = state;

  return ({
    title: functionName,
    prevObjectId,
    nextObjectId,

    onClickObjectList,
    onClickCopyObject,
    onClickPrevObject,
    onClickNextObject,
  });
};

export async function loadComponentData(self) {
  self.setState(LOADING_STATE);
  console.log('loadComponentData')
  await checkLogin(self);

  const {
    objectId,
    apiEndpoint, model, refModels, objectFields,
    afterObjectLoaded, afterNewObjectLoaded,
    pageLoad,
  } = self.state;

  const taskList = [];
  let object = {};
  console.log('object Id = ', objectId)
  if (objectId && (objectId !== '0')) {
    const { error, data } = await apiGetById(apiEndpoint.read, objectId, objectFields); // TODO: Only get model's field set
    console.log(' error,data : ', error, data)
    if (error) {
      self.setState({
        error: true,
        messages: apiError2Messages(error),
        loading: false,
      });

      return;
    }

    const objectData = data.data;
    object = nomalizeData(model, objectData);

    if (_.isFunction(afterObjectLoaded)) {
      await afterObjectLoaded(self, object);
    }

    // [!] load comment list => show create by afterObjectLoaded

    // refModels.push({
    //   fieldName: 'commentList',
    //   modelName: 'v2/comments',
    //   query: {
    //     fields: '_id, content, createdAt, createdBy, createdByUserName, createdByFullName',
    //     active: true,
    //     relatedModel: modelName,
    //     relatedDocumentId: objectId,
    //     sortBy: 'createdAt.desc',
    //   },
    //   autoPageLoad: true,
    // });
  } else {
    object = getDefaultModelValue(model);

    if (_.isFunction(afterNewObjectLoaded)) {
      await afterNewObjectLoaded(self, object);
    }
  }
  refModels.forEach((tmpModel) => {
    const {
      modelName, query,
      autoPageLoad,
      fieldName, refKeyField, relatedFields,
    } = tmpModel;

    if (autoPageLoad) { // [!] uniquePage[L]oad vs uniquePage[l]oad make error
      taskList.push(async (cb) => {
        const { error, data } = await apiGetList(modelName, query);

        if (error) {
          cb(error);
        } else {
          const dataLoad = {
            fieldName,
            refKeyField,
            relatedFields,
            data: data.data,
          };

          cb(null, dataLoad);
        }
      });
    } else if (!pageLoad[fieldName]) { // pageLoad DID NOT init manualy
      taskList.push(async (cb) => {
        const dataLoad = {
          fieldName,
          refKeyField,
          relatedFields,
          data: [],
        };

        cb(null, dataLoad);
      });
    } // if (tmpModel.autoPageLoad)
  });

  await async.series(taskList, async (err, loadedRefData) => {
    if (err) {
      self.setState({
        loading: false,
        error: true,
        messages: apiError2Messages(err),
      });
    } else {
      if (_.isArray(loadedRefData)) { // convert array to object to easy access
        loadedRefData.forEach((refData) => {
          pageLoad[refData.fieldName] = refData;
        });
      }

      self.setState({
        loading: false,
        pageLoad,
        object,
      });
    }
  });

  // window.scrollTo(0, 0); // scroll to Top
}
