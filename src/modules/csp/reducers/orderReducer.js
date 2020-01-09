import { createInitalState, getNewState } from '../../../libs/reducerHelper';
import { ACTIONS } from '../actions/orderAction';
import { model } from '../models/orderModel';


const INITIAL_STATE = createInitalState(model);

export default function (state = INITIAL_STATE, action) {
  // console.log('stateeee :', state)
  return getNewState(state, ACTIONS, action);
}

