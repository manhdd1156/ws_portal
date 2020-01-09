import { UI_START_LOADING, UI_STOP_LOADING } from "../actions/actionTypes";
import { getDefaultModelValue } from '../../../libs/modelHelper';
import { model } from '../models/signinModel';

const INITIAL_STATE = getDefaultModelValue(model);
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        loading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;