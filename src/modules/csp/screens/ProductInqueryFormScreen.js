import React, { Component } from 'react';

import ProductInqueryFormContainer from '../containers/ProductInqueryFormContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class ProductInqueryFormScreen extends Component {
  render() {
    return (
      <ProductInqueryFormContainer navigation={this.props.navigation} />
    );
  };
};
