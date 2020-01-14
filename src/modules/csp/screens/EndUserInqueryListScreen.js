import React, { Component } from 'react';

import EndUserInqueryListContainer from '../containers/EndUserInqueryListContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class EndUserInqueryListScreen extends Component {
  render() {
    return (
      <EndUserInqueryListContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerListScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }