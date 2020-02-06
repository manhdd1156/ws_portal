import React, { Component } from 'react';

import HomeContainer from '../containers/HomeContainer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../userControls/HeaderButton';
import { Colors } from "../../../constants/config"
export default class HomeScreen extends Component {
  render() {
    return (
      <HomeContainer navigation={this.props.navigation} />
    );
  };
};

HomeScreen.navigationOptions = navData => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
            // navData.navigation.navigate('Drawer',{test: 'toto'});
          }}
        />
      </HeaderButtons>
    ),
  }
}