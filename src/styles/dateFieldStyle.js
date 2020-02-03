import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.52,
    backgroundColor: 'white',
    borderRadius: scale(9),
    overflow: 'hidden',
    // paddingBottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  selectToggle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(4),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
    borderColor: Colors.black,
    borderWidth: 1,
    paddingLeft: scale(5),
    height: verticalScale(35)
  },
  textConfirm: {
    color: '#ffffff',
    fontSize: moderateScale(18)
  },
  icon: {
    color: Colors.primaryColor
  },
  inputDateView: {
    flex: 0.95,
    fontSize: moderateScale(14),
    color: Colors.black,
  },
  touchableStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: verticalScale(10)
  },
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
});