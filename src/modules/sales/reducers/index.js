import { combineReducers } from 'redux';

// import homeReducer from "./homeReducer";
// import signinReducer from "./signinReducer";
import orderReducer from "./orderReducer";

const salesReducer = combineReducers({
    // system: homeReducer,
    sales_orders: orderReducer,
    // signin: signinReducer,
});

export default salesReducer;