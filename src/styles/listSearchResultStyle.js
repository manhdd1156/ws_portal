import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({

  listView: {
    flex: 1,
    backgroundColor: Colors.lightGrey
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  loading: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center',
    zIndex: 100,
  },

  cardView: {
    marginLeft: scale(10),
    marginRight: scale(10),
  },
  cardHeaderView: {
    paddingLeft: scale(10),
    height: verticalScale(35),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey
  },
  checkboxView: {
    width: scale(30),
    marginLeft: scale(-9)
  },
  textSerialView: {
    paddingLeft: scale(10)
  },
  textSerial: {
    fontSize: moderateScale(16),
    corlor: Colors.primaryColor
  },
  text: {
    fontSize: moderateScale(16),
    color: Colors.black,
  },
  cardBodyView: {
    paddingLeft: scale(10),
  }
});