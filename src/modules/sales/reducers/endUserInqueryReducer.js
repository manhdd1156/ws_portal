import { createInitalState, getNewState } from '../../../libs/reducerHelper';
import { ACTIONS } from '../actions/endUserInqueryAction';
import { model } from '../models/endUserInqueryModel';

const INITIAL_STATE = createInitalState(model);

export default function (state = INITIAL_STATE, action) {
  return getNewState(state, ACTIONS, action);
}

