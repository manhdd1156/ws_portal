import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config';

export const styles = StyleSheet.create({
  textFieldView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  labelView: {
    justifyContent: 'flex-start',
  },
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    height: verticalScale(35),
    borderColor: Colors.black,
    borderRadius: scale(4),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(5),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
  radioView: {
    paddingTop: verticalScale(6),
    paddingBottom: verticalScale(6),
    paddingLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center'
  },
  tableView: {
    padding: scale(5)
  },
  tableHeadView: {
    backgroundColor: '#E3E4E5',
  },
  rowView: {
    flexDirection: 'row',
    borderRightColor: Colors.grey,
    borderRightWidth: 1,
  },
  tableCellView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  cellActionView : {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toggleOnStyle: {
    fontSize: moderateScale(25),
    color: Colors.primaryColor
  },
  toggleOffStyle: {
    fontSize: moderateScale(25),
    color: Colors.grey
  },
  saveQueryButtonStyle: {
    width: widthCol * 2.5
  },
  wrenchIconStyle: {
    color: 'white',
    fontSize: 20
  },
  wrenchButtonStyle: {
    minWidth: 0,
    width: scale(30),
    padding: scale(2)
  },
  removeIconStyle: {
    color: 'white',
    fontSize: 20
  },
  removeButtonStyle: {
    minWidth: 0,
    width: scale(30),
    padding: scale(2)
  },
});