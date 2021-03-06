import { combineReducers } from 'redux';

import homeReducer from "./csp/reducers/homeReducer";
import signinReducer from "./csp/reducers/signinReducer";
import orderReducer from "./csp/reducers/orderReducer";
import productInqueryReducer from "./csp/reducers/productInqueryReducer";
import endUserInqueryReducer from "./csp/reducers/endUserInqueryReducer";

const rootReducer = combineReducers({
    system: homeReducer,
    csp_orders: orderReducer,
    signin: signinReducer,
    csp_productInqueries: productInqueryReducer,
    csp_endUserInqueries: endUserInqueryReducer,
});

export default rootReducer;