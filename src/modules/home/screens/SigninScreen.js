import React, { Component } from 'react';

import SigninContainer from '../containers/SigninContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class SigninScreen extends Component {
  render() {
    return (
      <SigninContainer navigation={this.props.navigation} />
    );
  };
};
SigninScreen.navigationOptions = navData => {
  return {
    header: null,
  }
}