import React from 'react';
import { Platform, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import ProductInqueryListScreen from "./csp/screens/ProductInqueryListScreen";
import ProductInqueryFormScreen from "./csp/screens/ProductInqueryFormScreen";

import EndUserInqueryListScreen from "./csp/screens/EndUserInqueryListScreen";
import EndUserInqueryFormScreen from "./csp/screens/EndUserInqueryFormScreen";

import SigninScreen from "./home/screens/SigninScreen";
import SideDrawerScreen from "./home/screens/SideDrawerScreen";
import AuthLoadingScreen from './home/screens/AuthLoadingScreen';
import HomeScreen from './home/screens/HomeScreen'
import OrderListScreen from "./csp/screens/OrderListScreen";
import OrderFormScreen from "./csp/screens/OrderFormScreen";

// import HeaderButton from '../userControls/HeaderButton';
// import TopBarTitle from '../userControls/TopBarTitle'
// import { Colors } from '../constants/config';

const defaultStackNavOptions = (params) => { // config header của screen
  console.log('navigation params :', params)
  return {
    headerShown: false
  }
};
const CSPStack = createStackNavigator(
  {
    '/csp/dashboard/': {
      screen: HomeScreen,
    },
    '/csp/order/': {
      screen: OrderListScreen
    },
    '/csp/order/detail': {
      screen: OrderFormScreen
    },

    '/csp/productInqueries/': {
      screen: ProductInqueryListScreen
    },

    '/csp/productInqueries/detail': {
      screen: ProductInqueryFormScreen
    },

    '/csp/endUserInqueries/': {
      screen: EndUserInqueryListScreen
    },

    '/csp/endUserInqueries/detail': {
      screen: EndUserInqueryFormScreen
    },


  },
  {
    initialRouteName: '/csp/dashboard/',
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const ESDStack = createStackNavigator(
  {
    '/esd/dashboard/': {
      screen: HomeScreen,
    },
  },
  {
    initialRouteName: '/esd/dashboard/',
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const ModuleStack = createSwitchNavigator(
  {
    CSP: CSPStack,
    ESD: ESDStack,
  },
  {
    initialRouteName: 'CSP',
  },
);
const AppStack = createDrawerNavigator({
  Main: {
    screen: ModuleStack,
  },
  Signin: {
    screen: SigninScreen,
  }
}, {
  contentComponent: SideDrawerScreen,
  drawerWidth: Dimensions.get("window").width * 0.65,
  edgeWidth: -100 // no swipe drawer in each screen
});

const AuthStack = createStackNavigator({ Signin: SigninScreen });


const AppRouter = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

export default AppRouter;
