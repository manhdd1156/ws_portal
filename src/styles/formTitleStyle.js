import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.white,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
    height: verticalScale(50),
    marginBottom: 2
  },
  leftView: {
    flex: 0.3,
  },
  titleStyle: {
    color: Colors.primaryColor
  },
  rightView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: moderateScale(12),
    color: 'white'
  },
  buttonStyle: {
    padding: scale(4),
    borderRadius: scale(2),
    backgroundColor: Colors.primaryColor,
    width: scale(22),
  },
  loadingStyle: {
    height: scale(9),
  },
  loadingProps: {
    size: moderateScale(12),
  }
});