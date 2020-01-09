/*
 22/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PropsChildrenPropType } from '../libs/componentHelper';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';

export default class FormActionContainer extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <View style={styles.bottomView}>
        <ScrollView horizontal>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  bottomView: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingLeft: scale(12),
    paddingRight: scale(12),
  },
  scrollView: {
    // flex: 1,
    // justifyContent: 'flex-start',
  }
})
