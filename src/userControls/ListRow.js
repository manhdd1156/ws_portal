/*
 18/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import { View } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { styles } from '../styles/listRowStyle'
export default class ListRow extends Component {
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