import React from 'react';
import { Platform, View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import ProductInqueryListScreen from "./csp/screens/ProductInqueryListScreen";
import ProductInqueryFormScreen from "./csp/screens/ProductInqueryFormScreen";

import EndUserInqueryListScreen from "./csp/screens/EndUserInqueryListScreen";
import EndUserInqueryFormScreen from "./csp/screens/EndUserInqueryFormScreen";

import SigninScreen from "./csp/screens/SigninScreen";
import HomeScreen from './csp/screens/HomeScreen'
import OrderListScreen from "./csp/screens/OrderListScreen";
import OrderFormScreen from "./csp/screens/OrderFormScreen";
import SideDrawerScreen from "./csp/screens/SideDrawerScreen";
import AuthLoadingScreen from './csp/screens/AuthLoadingScreen';
import HeaderButton from '../userControls/HeaderButton';
import TopBarTitle from '../userControls/TopBarTitle'
import { Colors } from '../constants/config';

const defaultStackNavOptions = (params) => {
  let functionName;

  switch (params.navigation.state.routeName) {
    case '/csp/dashboard/':
      functionName = "Trang chủ"
      break;
    case '/csp/order/':
      functionName = "Đơn hàng"
      break;
    case '/csp/order/detail':
      functionName = "Chi tiết đơn hàng"
      break;

    case '/csp/productInqueries/':
      functionName = "Sản phẩm"
      break;
      
    case '/csp/productInqueries/detail':
     functionName = "Chi tiết sản phẩm"
     break;
  
    case '/csp/endUserInqueries/':
      functionName = "Khách hàng"
      break;
        
      
    case '/csp/endUserInqueries/detail':
      functionName = "Chi tiết Khách hàng"
      break;      
  }
  return {
    header : null
    // headerStyle: {
    //   backgroundColor: Platform.OS === 'android' ? Colors.transparentColor : ''
    // },

    // headerBackTitleStyle: {
    //   // fontFamily: 'open-sans'
    // },
    // headerLeft: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="back"
    //       iconName="ios-arrow-back"
    //       onPress={() => {
    //         params.navigation.goBack();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    // headerTintColor: Colors.primaryColor,
    // headerTitle: () => (<TopBarTitle functionName={functionName} />
    // )
  }
};
const HomeStack = createStackNavigator(
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
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const AppStack = createDrawerNavigator({
  Main: {
    screen: HomeStack,
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
