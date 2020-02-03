/*
 13/01/2020    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { Header, Title, Left, Icon, Right, Body } from 'native-base';
import { Colors } from '../constants/config';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Button } from 'react-native-elements'
import HeaderButton from './HeaderButton';
import { styles } from '../styles/listTitleStyle';
export default class ListTitle extends Component {
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
        <Body style={styles.bodyView}>
          <Title style={styles.titleStyle}>{functionName}</Title>
        </Body>

        <Right style={styles.rightView}>
          {isAdmin && (
            <Button
              loading={loading}
              loadingStyle={styles.loadingStyle}
              loadingProps={styles.loadingProps}
              icon={<Icon active style={styles.icon} ios='wrench' android='wrench' type='FontAwesome' />}
              color={Colors.primaryColor}
              buttonStyle={styles.buttonStyle}
              onPress={onClickFunctionRegister} />
          )}
          <Button
            loading={loading}
            disabled
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='list' android='list' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
            onPress={onClickFunctionRegister} />
          <Button
            loading={loading}
            disabled={!isEnabled}
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='file-o' android='file-o' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
            onPress={onClickFirstObject} />

        </Right>
      </Header>
    );
  }
}

