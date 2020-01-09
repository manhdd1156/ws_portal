/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Colors, moderateScale, scale } from '../constants/config';

export default class ListActionSearch extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    const { onModalSearch } = self;

    return (
      /* onPress={() => onModalSearch(true)} cũng là cách truyền param vào function onModalSearch(self,visible)
        còn nếu để mặc định như ở dưới thì sẽ truyền event vào onModalSearch(self,event)
      */
      <TouchableOpacity onPress={onModalSearch}>
        <Icon style={styles.actionSearch} ios='ios-search' android="ios-search" type="Ionicons" />
      </TouchableOpacity>

    )
  }
}
const styles = StyleSheet.create({
  actionSearch: {
    color: Colors.grey,
    fontSize: moderateScale(28)
  }
})