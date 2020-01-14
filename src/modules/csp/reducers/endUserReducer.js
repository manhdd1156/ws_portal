import { createInitalState, getNewState } from '../../../libs/reducerHelper';
import { ACTIONS } from '../actions/endUserAction';
import { model } from '../models/endUserModel';

const INITIAL_STATE = createInitalState(model);

export default function (state = INITIAL_STATE, action) {
  return getNewState(state, ACTIONS, action);
}

