/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors } from '../constants/config';
import { styles } from "../styles/defaultInputStyle";

const DefaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    ref={props.refInner}
    autoCapitalize='none'
    style={[styles.input, props.style,]}
    placeholderTextColor={Colors.placeholderTextColor}
  />
);

export default DefaultInput;
