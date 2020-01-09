/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from '../constants/config';
import { PropsChildrenPropType } from '../libs/componentHelper';

class ListModalRow extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <View style={styles.rowView}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: scale(5),
    paddingRight: scale(5)
  },
});
export default ListModalRow;

