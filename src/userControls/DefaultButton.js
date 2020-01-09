import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from "react-native";
import { Colors } from '../constants/config'
import { Button } from 'react-native-elements'
import { scale, moderateScale, verticalScale } from '../constants/config';
// const DefaultButton = props => (
//   <Button
//     {...props}
//     buttonStyle={[styles.button, props.buttonStyle]}
//   />
// );

export default class DefaultButton extends Component {
  static get propTypes() {
    return {
      color: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      color: Colors.primaryColor
    };
  }
  render() {
    const { props } = this;
    const { color } = props
    return (
      <Button
        {...props}
        buttonStyle={[styles.button, props.buttonStyle, { backgroundColor: color }]}
      />
    );
  }
}
const styles = StyleSheet.create({
  button: {
    fontSize: moderateScale(16),
    justifyContent: 'center',
    borderRadius: scale(8),
    padding: scale(10),
    minWidth: scale(95),
    marginLeft: scale(10),
    marginRight: scale(10),
  },
});