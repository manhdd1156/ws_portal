
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './src/modules/AppRouter';
import configureStore from './src/startup/configureStore';
// import navigationService from './src/service/navigationService';
import { setTopLevelNavigator, navigate } from './src/libs/commonHelper';
import './src/modules/i18n';
import { Root } from "native-base";
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Root>
      <AppRouter
        ref={(navigatorRef) => {
          setTopLevelNavigator(navigatorRef);
        }}
      />
    </Root>
  </Provider>
);
export default App


