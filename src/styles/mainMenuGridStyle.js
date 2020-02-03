import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  gridItem: {
    margin: 15,
    width: Dimensions.get('window').width / 2 - 20,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: moderateScale(17),
    color: Colors.primaryColor
  },
});