import React, { Component } from 'react';

import OrderListContainer from '../containers/OrderListContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class OrderListScreen extends Component {
  render() {
    return (
      <OrderListContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerListScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }