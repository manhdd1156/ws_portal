/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from "react-native";
import { scale, } from '../constants/config';
class EmptyField extends Component {
  render() {
    return (<View style={styles.emptyFieldView} />);
  }
}
const styles = StyleSheet.create({
  emptyFieldView: {
    flex: 1,
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
});

export default EmptyField;

