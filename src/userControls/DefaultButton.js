/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../constants/config';
import { Button } from 'react-native-elements';
import { styles } from '../styles/defaultButtonStyle';

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
