/*
 17/12/2019    FIT-ManhDD16     Created

*/
import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from '../constants/config';
import { styles } from '../styles/headingTextStyle';
const HeadingText = props => (
  <Text {...props} style={[styles.textHeading, props.style]}>
    {props.children}
  </Text>
);

export default HeadingText;