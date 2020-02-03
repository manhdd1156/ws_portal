import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
    paddingLeft: scale(10),
    paddingRight: scale(10),
  },
})