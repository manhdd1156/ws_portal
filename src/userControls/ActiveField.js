/*
 19/12/2019    FIT-ManhDD16     Created

*/

import React, { Component } from 'react';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { styles } from '../styles/activeFieldStyle'
import { scale, moderateScale, verticalScale } from '../constants/config';

export default class ActiveField extends Component {
  static get propTypes() {
    return {
      active: PropTypes.bool.isRequired,
    };
  }

  render() {
    const { active } = this.props;

    if (active) {
      return (<Icon active style={styles.icon} ios='check-circle-outline' android='check-circle-outline' type='MaterialCommunityIcons' />);
    }

    return (<Icon active style={styles.icon} ios='checkbox-blank-circle-outline' android='checkbox-blank-circle-outline' type='MaterialCommunityIcons' />);
  }
}
