import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import { Colors, scale, moderateScale, verticalScale } from "../../../constants/config"

export const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(30),
    backgroundColor: "white",
    flex: 1
  },
  headerContainer: {
    alignItems: 'center',
    height: '23%',
  },
  imageUser: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(38),
  },
  imageLogo: {
    width: '57%',
    height: '38%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  headerTextView: {
    width: Dimensions.get("window").width * 0.65 - scale(80),
    paddingLeft: scale(12)
  },
  infoView: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: scale(20),
  },
  line: {
    borderWidth: 0.5,
    borderColor: Colors.grey
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(20),
    backgroundColor: "#eeeeee",
  },
  drawerItemText: {
    color: Colors.primaryColor,
    fontSize: moderateScale(16),
  },
  footerContainer: {
    paddingTop: verticalScale(50),
    left: scale(5),
  },
  textName: {
    fontSize: moderateScale(18),
  },
  textHoline: {
    fontSize: moderateScale(15),
  }
});