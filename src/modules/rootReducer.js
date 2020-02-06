import { combineReducers } from 'redux';

import homeReducer from "./home/reducers/homeReducer";
import signinReducer from "./home/reducers/signinReducer";
import cspReducer  from "./csp/reducers";
import esdReducer  from "./esd/reducers";

const rootReducer = combineReducers({
    csp: cspReducer,
    esd: esdReducer,
    system: homeReducer,
    signin: signinReducer,
});

export default rootReducer;