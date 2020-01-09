import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../modules/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



const middleware = [thunk];

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  // console.log(' compose(applyMiddleware(promise)) : ', compose(applyMiddleware(promise)))
  // console.log(' store : ', store)
  return store;
}
