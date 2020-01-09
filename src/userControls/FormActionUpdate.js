/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { validateObjectId } from '../libs/commonHelper';
import DefaultButton from './DefaultButton'
import { Colors, moderateScale, scale } from '../constants/config';

export default class FormActionUpdate extends Component {
  static get propTypes() {
    return {
      disabled: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      disabled: false,
    };
  }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { state, onUpdate } = self;
    const { loading, object } = state;
    const { disabled } = this.props;
    const { permmission } = self.props;

    if (!permmission.canUpdate || !validateObjectId(object._id)) return (<React.Fragment />);
    return (
      <Translation ns="system">
        {
          t => (
            <DefaultButton color={Colors.primaryColor} onPress={onUpdate} disabled={disabled} title={t('btn.update')} />
          )
        }
      </Translation>);
  }
}

