import React, { Component } from "react";
import { View, StyleSheet, } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';

export default class ListActionList extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <View style={styles.headerView}>
        {this.props.children}
      </View>);
  }

}
const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(5),
    paddingLeft: scale(12),
    paddingRight: scale(19),
  },
})
