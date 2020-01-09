import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constants/config'
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
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});