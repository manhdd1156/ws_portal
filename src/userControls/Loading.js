/*
 13/01/2020    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constants/config'
import { styles } from '../styles/loadingStyle';

export default class Loading extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ActivityIndicator size="large" style={styles.loading} color={Colors.primaryColor} />
    );
  }
}
