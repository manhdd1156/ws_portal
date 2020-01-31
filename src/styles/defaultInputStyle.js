import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 23,
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(15),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
});