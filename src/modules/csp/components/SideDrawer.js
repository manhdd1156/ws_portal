import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  Linking,
  Image,
  SectionList,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from 'prop-types';
import { Icon } from "native-base";
import { Colors, scale, moderateScale, verticalScale } from '../../../constants/config';
import { NavigationActions } from 'react-navigation';
import Constants from "expo-constants";
import { MENU_ITEM } from '../constants/itemConstant'
import { convertCspFunctionList } from '../../../libs/componentHelper'
const imageUser = require('../../../assets/images/user-image.png');
const logo = require('../../../assets/images/fit-logo2.png')
export default class SideDrawer extends Component {
  constructor(props) {
    super(props);
    // console.log('props : ', props)
    this.state = {
      ...this.state,

    }
  }

  navigateToScreen = (route, functionId) => async () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    if (route === "/csp/dashboard/") {
      this.props.navigation.closeDrawer()
    }
    else if (route === "SignOut") {
      // console.log('============== :',this.props.navigation)
      await this.props.onLogout();
      // console.log('======.....')
      this.props.navigation.navigate('Auth');
    } else {
      this.props.handleChangeCurrentFunction(functionId);
      this.props.navigation.dispatch(navigateAction);
    }

  }
  callNumber = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Số điện thoại không có sẵn');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { functionList, user } = this.props
    const cspFunctionList = convertCspFunctionList(functionList)
    return (
      <View
        style={
          styles.container}
      >
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.imageLogo} />
          <View style={styles.infoView}>
            <Image source={imageUser} style={styles.imageUser} />
            <View style={styles.headerTextView}>
              <Text style={styles.textName} numberOfLines={2} ellipsizeMode="tail">{user.fullName}</Text>
              {/* <Text>Address@gmail.com</Text> */}
            </View>
          </View>
        </View>
        <View style={styles.line}>
        </View>
        <ScrollView>
          <TouchableOpacity onPress={this.navigateToScreen('/csp/dashboard/')}>
            <View style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>Trang chủ</Text>
            </View>
          </TouchableOpacity>
          <SectionList
            keyExtractor={(item, index) => item._id}
            sections={cspFunctionList}
            renderSectionHeader={({ section }) => (
              <View >
                <Text style={{ paddingLeft: scale(5) }}>{section.title}</Text>
              </View>
            )}
            renderItem={(itemData) => (
              <TouchableOpacity onPress={this.navigateToScreen(itemData.item.functionUrl, itemData.item.functionId)}>
                <View style={styles.drawerItem}>
                  <Text style={styles.drawerItemText}>{itemData.item.functionName}</Text>
                </View>
              </TouchableOpacity>
            )}

          />
          <TouchableOpacity onPress={this.navigateToScreen('SignOut')}>
            <View style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>Thoát</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={{ flexDirection: 'row' }}>
              <Text style={styles.textHoline}>Liên hệ: CanhNV5 - </Text>
              <Text onPress={() => this.callNumber('0987749772')} style={[styles.textHoline, { color: '#0093e0', }]}>0987749772</Text>
            </Text>
            <Text style={styles.textHoline}>{`v${Constants.manifest.version}`}</Text>
          </View>
        </ScrollView>


      </View >
    );
  }
}

const styles = StyleSheet.create({
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
  drawerItemIcon: {
    paddingRight: scale(20),
    color: Colors.primaryColor,
    width: moderateScale(70),
    justifyContent: 'flex-start',
    fontSize: moderateScale(30)
  },
  drawerItemText: {
    color: Colors.primaryColor,
    fontSize: moderateScale(16),
  },
  footerContainer: {
    // position: 'absolute',
    // bottom: 0,
    paddingTop: verticalScale(50),
    left: scale(5),
  },
  textName: {
    fontSize: moderateScale(18),
    // fontFamily: 'open-sans-bold'
  },
  textHoline: {
    fontSize: moderateScale(15),
  }
});

SideDrawer.propTypes = {
  navigation: PropTypes.object
};

