/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'native-base';
import { Colors, moderateScale } from '../constants/config';

export default class ListActionSearch extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      objectList
    } = self.state;

    const totalAmount = objectList && objectList.length ? objectList.length : 0;
    return (
      <Translation>
        {
          t => (<View style={styles.resultSearchView}><Text style={styles.resultSearchText}>{t('system:pageNav.totalAmount', { totalAmount })} </Text></View>)
        }
      </Translation>
    )
  }
}
const styles = StyleSheet.create({
  resultSearchView: {
    justifyContent: 'center',
  },
  resultSearchText: {
    color: Colors.black,
    fontSize: moderateScale(16),
  },
})