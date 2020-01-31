/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";

import { Header, Title, Left, Icon, Right, Body, } from 'native-base';
import { Button } from 'react-native-elements'
import { Colors } from '../constants/config';
import { styles } from '../styles/formTitleStyle';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

export default class FormTitle extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { functionName, permmission } = self.props;

    const {
      state,
      onClickObjectList, onClickCopyObject,
      onClickPrevObject, onClickNextObject,
    } = self;

    const {
      loading, error,
      objectId, prevObjectId, nextObjectId,
    } = state;

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
          <Button
            loading={loading}
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='list' android='list' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
            onPress={onClickObjectList} />
          <Button
            loading={loading}
            disabled
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='file-o' android='file-o' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
          />
          {
            (permmission.canCreate) && (
              <Button
                loading={loading}
                loadingStyle={styles.loadingStyle}
                loadingProps={styles.loadingProps}
                disabled={(objectId === '') || (objectId === '0')}
                icon={<Icon active style={styles.icon} ios='copy' android='copy' type='FontAwesome' />}
                color={Colors.primaryColor}
                buttonStyle={styles.buttonStyle}
                onPress={onClickCopyObject} />
            )
          }
          <Button
            loading={loading}
            disabled={!prevObjectId}
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='angle-left' android='angle-left' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
            onPress={onClickPrevObject} />
          <Button
            loading={loading}
            disabled={!nextObjectId}
            loadingStyle={styles.loadingStyle}
            loadingProps={styles.loadingProps}
            icon={<Icon active style={styles.icon} ios='angle-right' android='angle-right' type='FontAwesome' />}
            color={Colors.primaryColor}
            buttonStyle={styles.buttonStyle}
            onPress={onClickNextObject} />
        </Right>
      </Header>
    );
  }
}
