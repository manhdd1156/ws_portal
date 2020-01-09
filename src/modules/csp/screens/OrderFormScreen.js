import React, { Component } from 'react';

import OrderFormContainer from '../containers/OrderFormContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class OrderFormScreen extends Component {
  render() {
    console.log('step 4 : OrderFormScreen')
    return (
      <OrderFormContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerFormScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }