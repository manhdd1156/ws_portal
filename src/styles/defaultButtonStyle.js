import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../constants/config";

export const styles = StyleSheet.create({
  button: {
    fontSize: moderateScale(16),
    justifyContent: 'center',
    borderRadius: scale(8),
    padding: scale(5),
    minWidth: scale(95),
  },
});