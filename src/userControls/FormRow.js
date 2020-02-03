/*
 31/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from '../constants/config';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { styles } from '../styles/formRowStyle';

export default class FormRow extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <View style={styles.rowView}>
        {this.props.children}
      </View>
    );
  }
}