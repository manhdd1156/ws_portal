import { combineReducers } from 'redux';

import homeReducer from "./homeReducer";
import signinReducer from "./signinReducer";
// import orderReducer from "./orderReducer";
// import productInqueryReducer from "./productInqueryReducer";
// import endUserInqueryReducer from "./endUserInqueryReducer";

const esdReducer = combineReducers({
    system: homeReducer,
    // esd_orders: orderReducer,
    signin: signinReducer,
    // esd_productInqueries: productInqueryReducer,
    // esd_endUserInqueries: endUserInqueryReducer,
});

export default esdReducer;