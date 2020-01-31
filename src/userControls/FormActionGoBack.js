/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Translation } from 'react-i18next';

import DefaultButton from './DefaultButton'
import { Colors, moderateScale, scale } from '../constants/config';

export default class FormActionGoBack extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { state } = self;
    return (
      <Translation ns="system">
        {
          t => (<DefaultButton color={Colors.secondaryColor} onPress={() => { self.props.navigation.goBack()}} title={t('btn.goBack')} />
          )
        }
      </Translation>);
  }
}

