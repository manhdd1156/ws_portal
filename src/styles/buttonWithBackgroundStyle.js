import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    width: "70%",
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#ff868e"
  },
  disabled: {
    backgroundColor: Colors.primaryColor,
    borderColor: "#ffffff"
  },
  disabledText: {
    color: "#ffffff"
  },
  enabled: {
    backgroundColor: Colors.primaryColor,
    borderColor: "#ffffff"
  },
  enabledText: {
    color: "#ffffff"
  },
  touchableHighlight: {
    flexDirection: 'row',
  },
  textButton: {
    fontSize: 17,
    color: "white"
  }
});