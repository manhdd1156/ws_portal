/*
 19/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View, StyleSheet, } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';

export default class ListInRow extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    if (this.props.children.length > 1) { /* nếu có 2 phần tử trong 1 line*/
      return (
        <View style={styles.lineRow}>
          <View style={styles.halfLine}>
            {this.props.children[0]}
          </View>
          <View style={styles.halfLine}>
            {this.props.children[1]}
          </View>
        </View>
      )
    }
    /* Mặc định nếu có 1 phần tử trong 1 line*/
    return (
      <View style={styles.lineRow}>
        {this.props.children}
      </View>);
  }

}
const styles = StyleSheet.create({
  lineRow: {
    paddingLeft: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  halfLine: {
    flex: 0.485,
    justifyContent: 'center'
  }
})
