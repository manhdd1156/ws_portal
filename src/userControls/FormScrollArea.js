/*
 30/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';
import { styles } from '../styles/formScrollAreaStyle';

export default class FormScrollArea extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      children: PropTypes.object.isRequired,
    };
  }

  render() {
    const { name, children } = this.props;

    if (!name) {
      return (
        <View style={styles.container}>
          <View style={styles.formScrollAreaView}>
            {children}
          </View>
        </View>
      );
    }

    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.container}>
              <View style={styles.labelView}><Text style={styles.label}> {i18n.exists(name) ? t(name) : name}</Text></View>
              <View style={styles.formScrollAreaView}>
                {children}
              </View>
            </View>)
        }
      </Translation>);
  }
}