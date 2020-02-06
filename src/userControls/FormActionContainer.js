/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import {styles } from '../styles/formActionContainerStyle';

export default class FormActionContainer extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <View style={styles.bottomView}>
        {this.props.children}
      </View>
    );
  }

}
