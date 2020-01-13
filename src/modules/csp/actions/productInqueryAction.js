import { createActionType, createAction } from '../../../libs/actionHelper';

export const ACTIONS = createActionType('PRODUCT_INQUERY', []);
export const action = createAction(ACTIONS);

