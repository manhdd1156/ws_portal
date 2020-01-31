/*
 07/01/2020    FIT-ManhDD16     Created

*/
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormBody extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]).isRequired,
    };
  }

  render() {
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}