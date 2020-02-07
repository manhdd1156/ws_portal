/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { Alert } from 'react-native'
import DefaultButton from './DefaultButton'
import { Colors, moderateScale, scale } from '../constants/config';
import { validateObjectId } from '../libs/commonHelper';
import { onDeleteCustome } from '../functions/formActionDeleteFunction';

export default class FormActionDelete extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteCustome = onDeleteCustome.bind(this, this);
  }
  // onDeleteCustome(t) {
  //   const { onDeleteCancle, onDeleteConfirm } = this.context.self;

  //   Alert.alert(
  //     'Thông báo',
  //     t('msg.delete.confirmMessage'),
  //     [
  //       { text: t('btn.confirm'), onPress: onDeleteConfirm },
  //       {
  //         text: t('btn.cancel'),
  //         // onPress: onDeleteCancle,
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: false },
  //   )
  // }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      state,
    } = self;

    const { loading, object } = state;
    const { permmission } = self.props;

    if (!permmission.canDelete || !validateObjectId(object._id)) return (<React.Fragment />);
    return (
      <Translation ns="system">
        {
          t => (
            <DefaultButton color={Colors.primaryColor} onPress={() => this.onDeleteCustome(t)} title={t('btn.delete')} />
          )
        }
      </Translation>);
  }
}

