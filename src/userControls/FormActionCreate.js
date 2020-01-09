/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { validateObjectId } from '../libs/commonHelper';
import DefaultButton from './DefaultButton'
import { Colors, moderateScale, scale } from '../constants/config';

export default class FormActionCreate extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { state, onCreate } = self;

    const { loading, object } = state;
    const { permmission } = self.props;

    if (!permmission.canCreate || validateObjectId(object._id)) return (<React.Fragment />);
    return (
      <Translation ns="system">
        {
          t => (<DefaultButton color={Colors.primaryColor} onPress={onCreate} title={t('btn.create')} />)
        }
      </Translation>
    );
  }
}

