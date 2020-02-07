import React, { Component } from 'react';

import EndUserFormContainer from '../containers/EndUserFormContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class EndUserFormScreen extends Component {
  render() {
    console.log('step 4 : OrderFormScreen')
    return (
      <EndUserFormContainer navigation={this.props.navigation} />
    );
  };
};
// CustomerFormScreen.navigationOptions = navData => {
//   return {
//     headerLeft: null

//   }
// }