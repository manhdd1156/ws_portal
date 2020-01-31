import { createInitalState, getNewState } from '../../../libs/reducerHelper';
import { ACTIONS } from '../actions/productInqueryAction';
import { model } from '../models/productInqueryModel';

const INITIAL_STATE = createInitalState(model);

export default function (state = INITIAL_STATE, action) {
  return getNewState(state, ACTIONS, action);
}

