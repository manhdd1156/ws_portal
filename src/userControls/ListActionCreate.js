/*
 29/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { View } from 'react-native';
import DefaultButton from './DefaultButton'
import { Colors } from '../constants/config';

export default class ListActionCreate extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    const { state, onCreateNew } = self;

    const { loading } = state;
    const { permmission } = self.props;

    if (!permmission.canCreate) return (<View />);

    return (
      <Translation ns="system">
        {
          t => (<DefaultButton loading={loading} color={Colors.primaryColor} onPress={onCreateNew} title={t('btn.create')} />)
        }
      </Translation>
    )
  }
}