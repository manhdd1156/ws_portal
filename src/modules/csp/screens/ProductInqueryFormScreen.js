import React, { Component } from 'react';

import ProductInqueryFormContainer from '../containers/ProductInqueryFormContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class ProductInqueryFormScreen extends Component {
  render() {
    console.log('step 4 : OrderFormScreen')
    return (
      <ProductInqueryFormContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerFormScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }