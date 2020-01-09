export const DRAFT = 'draft';
export const SENT = 'sent';
export const SALES_APPROVE = 'sale_approve';
export const BD_APPROVE = 'bd_approve';
export const REJECTED = 'rejected'
export const COMPLETED = 'completed';

export const ORDER_STATE = {};

ORDER_STATE.DRAFT = DRAFT;
ORDER_STATE.SENT = SENT;
ORDER_STATE.SALES_APPROVE = SALES_APPROVE;
ORDER_STATE.BD_APPROVE = BD_APPROVE;
ORDER_STATE.COMPLETED = COMPLETED;

export const ORDER_STATE_LIST = [];
ORDER_STATE_LIST[ORDER_STATE.DRAFT] = 'Dự thảo';
ORDER_STATE_LIST[ORDER_STATE.SALES_APPROVE] = 'Sales duyệt';
ORDER_STATE_LIST[ORDER_STATE.BD_APPROVE] = 'BD duyệt';
ORDER_STATE_LIST[ORDER_STATE.COMPLETED] = 'Hoàn thành';

export const ORDERSTATE = [
    ORDER_STATE_LIST[ORDER_STATE.DRAFT],
    ORDER_STATE_LIST[ORDER_STATE.SALES_APPROVE],
    ORDER_STATE_LIST[ORDER_STATE.BD_APPROVE],
    ORDER_STATE_LIST[ORDER_STATE.COMPLETED],
]
export const getCurrentPosition = (orderState) => {
    return ORDERSTATE.findIndex(f => f === ORDER_STATE_LIST[orderState])
}


export const PAUG = 'paug';
export const FIX = 'fix';
export const BOTH = 'both';

export const PAY_TYPE = {};
PAY_TYPE.PAUG = PAUG;
PAY_TYPE.FIX = FIX;
PAY_TYPE.BOTH = BOTH;

export const PAY_TYPE_LIST = [];
PAY_TYPE_LIST[PAY_TYPE.PAUG] = 'Pay as you go';
PAY_TYPE_LIST[PAY_TYPE.FIX] = 'Mua theo gói';

export const billingOptionsList = [
    { key: PAY_TYPE.PAUG, value: PAY_TYPE.PAUG, text: PAY_TYPE_LIST[PAY_TYPE.PAUG] },
    { key: PAY_TYPE.FIX, value: PAY_TYPE.FIX, text: PAY_TYPE_LIST[PAY_TYPE.FIX] },
];
