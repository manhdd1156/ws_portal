import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  tabView: {
    marginLeft: 10,
    marginRight: 10,
  },
  tabContainerStyle: {
    elevation: 0,
    backgroundColor: Colors.transparentColor,
    flex: 1,
    height: verticalScale(40),
  },
  tabBarUnderlineStyle: {
    height: 0
  },
  tabStyle: {
    backgroundColor: Colors.transparentColor,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  textStyle: {
    color: Colors.black
  },
  activeTabStyle: {
    backgroundColor: Colors.transparentColor,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: scale(4),
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  activeTextStyle: {
    color: Colors.black,
    fontWeight: 'bold'
  },
  viewTabStyle: {
    // height: verticalScale(100),
    paddingTop: verticalScale(5),
    borderColor: Colors.black,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: scale(4),
    borderBottomRightRadius: scale(4),
  }
});
