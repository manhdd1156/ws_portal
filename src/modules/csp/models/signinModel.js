import { DATA_TYPE } from '../../../constants/dataType';


export const model = {
  stateName: 'signin',
  // modelName : 'v1/signin',
  // // data : {
  // //     _id : {type: DATA_TYPE.ID, defaultValue : '0',required: true},

  // //     orderName: {
  // //         type: DATA_TYPE.STRING
  // //     }
  // // }
  modelName: 'signin',
  user: {
    type: DATA_TYPE.OBJECT,
    defaultValue: {},
  },

  status: {
    type: DATA_TYPE.STRING,
    defaultValue: 'login',
  },

  moduleList: {
    type: DATA_TYPE.ARRAY,
    defaultValue: [],
  },
  currentModuleId: {
    type: DATA_TYPE.STRING,
    defaultValue: '',
  },

  functionList: {
    type: DATA_TYPE.ARRAY,
    defaultValue: [],
  },
  currentFunctionId: {
    type: DATA_TYPE.STRING,
    defaultValue: '',
  },
  currentFunctionName: {
    type: DATA_TYPE.STRING,
    defaultValue: '',
  },
  currentFunctionUrl: {
    type: DATA_TYPE.STRING,
    defaultValue: '',
  },
  currentFunctionActionList: {
    type: DATA_TYPE.STRING,
    defaultValue: '',
  },
}
export default model;