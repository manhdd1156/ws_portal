import React, { Component } from 'react';

import SideDrawerContainer from '../containers/SideDrawerContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
export default class SideDrawerScreen extends Component {
  render() {
    return (
      <SideDrawerContainer navigation={this.props.navigation} />
    );
  };
};
