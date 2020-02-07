import { createActionType, createAction } from '../../../libs/actionHelper';

export const ACTIONS = createActionType('CUSTOMER', []);
export const action = createAction(ACTIONS);

