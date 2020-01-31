/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Translation } from 'react-i18next';
import DefaultButton from './DefaultButton'
import { Colors, moderateScale, scale } from '../constants/config';

export default class FormActionSend extends React.Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { state, onSend } = self;

    const { loading } = state;
    const { permmission, id } = self.props;

    if (!permmission.canSend || id === '0') return (<React.Fragment />);

    return (
      <Translation ns="system">
        {
          t => (
          <DefaultButton color={Colors.primaryColor} onPress={onSend} title={t('btn.send')} />
          )
        }
      </Translation>);
  }
}

