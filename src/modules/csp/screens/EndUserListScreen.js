import React, { Component } from 'react';

import EndUserListContainer from '../containers/EndUserListContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class EndUserListScreen extends Component {
  render() {
    return (
      <EndUserListContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerListScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }