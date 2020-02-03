import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    paddingTop: verticalScale(10),
    overflow: 'hidden',
    marginHorizontal: 18,
    marginVertical: 26,
    borderRadius: 6,
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: 'white',
  },
  bodyView: {
    flex: 0.8
  },
  textConfirm: {
    color: 'white',
    fontSize: moderateScale(16)
  },
  bottomView: {
    height: verticalScale(50),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonView: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  touchableButton: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  }
});