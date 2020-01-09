/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Colors, moderateScale, scale } from '../constants/config';

export default class ListActionCreate extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    const { state, onCreateNew } = self;

    const { loading } = state;
    const { permmission } = self.props;

    if (!permmission.canCreate) return (<View />);

    return (
      <TouchableOpacity onPress={onCreateNew} >
        <Icon style={styles.actionCreate} ios='ios-add' android="ios-add" type="Ionicons" />
      </TouchableOpacity>

    )
  }
}
const styles = StyleSheet.create({
  actionCreate: {
    color: Colors.secondaryColor,
    fontSize: moderateScale(38)
  }
})