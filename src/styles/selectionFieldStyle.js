import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  textFieldView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  labelView: {
    justifyContent: 'flex-start'
  },
  sectionView: {
    borderRadius: scale(4),
  },
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
});