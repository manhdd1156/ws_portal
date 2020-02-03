/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { styles } from '../styles/listActionContainerStyle'
export default class ListActionContainer extends Component {
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