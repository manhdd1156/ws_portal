import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  areaFieldView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
    paddingBottom: verticalScale(5),
  },
  labelView: {
    justifyContent: 'flex-start'
  },
  textArea: {
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: scale(4),
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },

});