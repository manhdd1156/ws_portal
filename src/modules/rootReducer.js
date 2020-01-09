import { combineReducers } from 'redux';

import homeReducer from "./csp/reducers/homeReducer";
import signinReducer from "./csp/reducers/signinReducer";
import orderReducer from "./csp/reducers/orderReducer";
const rootReducer = combineReducers({
    system: homeReducer,
    csp_orders: orderReducer,
    signin: signinReducer,
});

export default rootReducer;