import { StyleSheet, StatusBar, Platform,Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(5),
    paddingRight: scale(5),
    paddingBottom: verticalScale(5)
  },
  resultSearchView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: scale(10)
  },
  resultSearchText: {
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  selectAllView: {
    flexDirection: 'row',
    paddingLeft: scale(10),
    // flex: 0.4,
  },
  navigatorView: {
    flex: 0.6,
  },
  actionView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  resultSelectedText: {
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  actionText: {
    color: Colors.primaryColor,
    fontSize: moderateScale(16),
  },
  checkboxTouchArea: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.1,
    paddingLeft: scale(1)
  },
  resultSelectedView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonStyle: {
    marginLeft: scale(5),
    marginRight: scale(5),
    justifyContent: 'center'
  },
})