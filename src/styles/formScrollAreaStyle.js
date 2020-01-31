import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from '../constants/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
    paddingBottom: verticalScale(5),
  },
  labelView: {
    justifyContent: 'flex-start'
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
  formScrollAreaView: {
    marginLeft: scale(5),
    marginRight: scale(5),
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: scale(4),
    height: Dimensions.get('window').height * 0.25,
  },
})

