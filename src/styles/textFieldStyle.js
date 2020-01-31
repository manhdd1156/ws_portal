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
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    height: verticalScale(35),
    borderColor: Colors.black,
    borderRadius: scale(4),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(5),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
});