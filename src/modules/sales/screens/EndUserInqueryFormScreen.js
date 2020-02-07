import React, { Component } from 'react';

import EndUserInqueryFormContainer from '../containers/EndUserInqueryFormContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class EndUserInqueryFormScreen extends Component {
  render() {
    return (
      <EndUserInqueryFormContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerFormScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }