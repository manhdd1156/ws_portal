import React, { Component } from 'react';

import ProductInqueryListContainer from '../containers/ProductInqueryListContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class ProductInqueryListScreen extends Component {
  render() {
    return (
      <ProductInqueryListContainer navigation={this.props.navigation} />
    );
  };
};
