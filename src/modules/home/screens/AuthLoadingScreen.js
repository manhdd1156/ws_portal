import React, { Component } from 'react';

import AuthLoadingContainer from '../containers/AuthLoadingContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class AuthLoadingScreen extends Component {
  render() {
    console.log('step 1 : AuthLoadingScreen ')
    return (
      <AuthLoadingContainer navigation={this.props.navigation} />
    );
  };
};
