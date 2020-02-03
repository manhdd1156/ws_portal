/*
 25/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Translation } from 'react-i18next';
import { View } from 'react-native';
import DefaultButton from './DefaultButton'
import { Colors } from '../constants/config';

export default class ListActionSearch extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<View />);

    const { state, onSearch } = self;
    const { loading } = state;
    const { permmission } = self.props;

    if (!permmission.canRead) return (<View />);

    return (
      /* onPress={() => onModalSearch(true)} cũng là cách truyền param vào function onModalSearch(self,visible)
        còn nếu để mặc định như ở dưới thì sẽ truyền event vào onModalSearch(self,event)
      */
      // <TouchableOpacity onPress={onModalSearch}>
      //   <Icon style={styles.actionSearch} ios='ios-search' android="ios-search" type="Ionicons" />
      // </TouchableOpacity>

      <Translation ns="system">
        {
          t => (<DefaultButton loading={loading} color={Colors.primaryColor} onPress={onSearch} title={t('btn.search')} />)
        }
      </Translation>
    )
  }
}