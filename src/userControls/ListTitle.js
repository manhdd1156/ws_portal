/*
 13/01/2020    FIT-ManhDD16     Created

*/
import React, { Component } from "react";

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from 'native-base';
import { scale, moderateScale, verticalScale, Colors } from '../constants/config';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

class ListTitle extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);
    const {
      state,
      onClickFirstObject, onClickFunctionRegister,
    } = self;

    const { functionName, isAdmin } = self.props;
    const { loading, error, objectList } = state;
    const isEnabled = objectList && objectList.data && objectList.data.length > 0;

    return (
      <Header style={styles.headerView}>
        <Left style={styles.leftView}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="back"
              iconName="ios-arrow-back"
              onPress={() => {
                self.props.navigation.goBack();
              }}
            />
          </HeaderButtons>
        </Left>
        <Body >
          <Title style={styles.titleStyle}>{functionName}</Title>
        </Body>

        <Right style={styles.rightView}>
          {isAdmin && (
            <TouchableOpacity onPress={loading ? null : onClickFunctionRegister}>
              <Icon active style={{ fontSize: moderateScale(16), color: Colors.primaryColor }} ios={loading ? 'spinner' : 'wrench'} android={loading ? 'spinner' : 'wrench'} type={loading ? 'EvilIcons' : 'FontAwesome5'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity disabled >
            <Icon active loading style={{ fontSize: moderateScale(16), color: Colors.disableButtonColor }} ios={loading ? 'spinner' : 'list'} android={loading ? 'spinner' : 'list'} type={loading ? 'EvilIcons' : 'FontAwesome'} />
          </TouchableOpacity>
          <TouchableOpacity disabled={!isEnabled} onPress={onClickFirstObject}>
            <Icon active style={{ fontSize: moderateScale(16), color: isEnabled ? Colors.primaryColor : Colors.disableButtonColor }} ios={loading ? 'spinner' : 'file-o'} android={loading ? 'spinner' : 'file-o'} type={loading ? 'EvilIcons' : 'FontAwesome'} />
          </TouchableOpacity>
        </Right>
      </Header>
      // <View style={styles.configView}>

      // </View>
    );
  }
}
const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.white,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
    height: verticalScale(50),
    marginBottom: 2
  },
  leftView: {
    flex: 0.2
  },
  titleStyle: {
    color: Colors.primaryColor
  },
  rightView: {
    flex: 0.35,
    justifyContent: 'space-between',
  },
});
export default ListTitle;

