import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  bottomView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingLeft: scale(12),
    paddingRight: scale(12),
  },
})
