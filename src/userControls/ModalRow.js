/*
 19/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { styles } from '../styles/modalRowStyle';
export default class ModalRow extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    if (this.props.children.length > 1) { /* nếu có 2 phần tử trong 1 Row*/
      return (
        <View style={styles.row}>
          <View style={styles.halfRow}>
            {this.props.children[0]}
          </View>
          <View style={styles.halfRow}>
            {this.props.children[1]}
          </View>
        </View>
      )
    }
    /* Mặc định nếu có 1 phần tử trong 1 Row*/
    return (
      <View style={styles.row}>
        {this.props.children}
      </View>);
  }

}