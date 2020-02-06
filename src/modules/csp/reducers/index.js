import { combineReducers } from 'redux';

// import homeReducer from "./homeReducer";
// import signinReducer from "./signinReducer";
import orderReducer from "./orderReducer";
import productInqueryReducer from "./productInqueryReducer";
import endUserInqueryReducer from "./endUserInqueryReducer";

const cspReducer = combineReducers({
    // system: homeReducer,
    csp_orders: orderReducer,
    // signin: signinReducer,
    csp_productInqueries: productInqueryReducer,
    csp_endUserInqueries: endUserInqueryReducer,
});

export default cspReducer;