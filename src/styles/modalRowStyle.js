import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  row: {
    paddingLeft: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  halfRow: {
    flex: 0.485,
    justifyContent: 'center'
  }
})