import { createActionType, createAction } from '../../../libs/actionHelper';

export const ACTIONS = createActionType('ORDER', []);
export const action = createAction(ACTIONS);

