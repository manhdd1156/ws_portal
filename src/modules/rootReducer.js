import { combineReducers } from 'redux';

import homeReducer from "./home/reducers/homeReducer";
import signinReducer from "./home/reducers/signinReducer";
import cspReducer  from "./csp/reducers";
import esdReducer  from "./esd/reducers";
import salesReducer from './sales/reducers';

const rootReducer = combineReducers({
    csp: cspReducer,
    esd: esdReducer,
    sales: salesReducer,
    system: homeReducer,
    signin: signinReducer,
});

export default rootReducer;