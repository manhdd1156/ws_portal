/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import { View } from "react-native";
import { styles } from '../styles/emptyFieldStyle';

export default class EmptyField extends Component {
  render() {
    console.log('abc = :', abc)
    return (<View style={styles.emptyFieldView} />);
  }
}