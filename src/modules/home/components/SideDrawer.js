import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  Linking,
  Image,
  FlatList
} from "react-native";
import { NavigationActions } from 'react-navigation';
import Constants from "expo-constants";
import { convertFunctionList, convertModuleList } from '../../../libs/componentHelper'
const imageUser = require('../../../assets/images/user-image.png');
const logo = require('../../../assets/images/fit-logo2.png')
import { styles } from '../styles/sideDrawerStyle';
export default class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,

    }
  }

  navigateToScreen = (route, modName) => async () => {
    console.log('moduleCode :', route)
    console.log('moduleName :', modName)
    console.log('this.props.navigation :', this.props.navigation)
    console.log('NavigationActions :', NavigationActions)
    const navigateAction = NavigationActions.navigate({
      routeName: route
    }, { moduleName: modName });
    if (route === "home") {
      this.props.navigation.closeDrawer()
    }
    else if (route === "SignOut") {
      await this.props.onLogout();
      this.props.navigation.navigate('Auth');
    } else {
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
    const { user, moduleList } = this.props
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
          <TouchableOpacity onPress={this.navigateToScreen('home')}>
            <View style={styles.drawerItem}>
              <Text style={styles.drawerItemText}>Trang chủ</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item, index) => item._id}
            data={moduleList}

            renderItem={(itemData) => (
              <TouchableOpacity onPress={this.navigateToScreen(itemData.item.moduleCode, itemData.item.moduleName)}>
                <View style={styles.drawerItem}>
                  <Text style={styles.drawerItemText}>{itemData.item.moduleName}</Text>
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
              <Text style={styles.textHoline}>Liên hệ: AnhDN4 - </Text>
              <Text onPress={() => this.callNumber('+84936346346')} style={[styles.textHoline, { color: '#0093e0', }]}>+84936346346</Text>
            </Text>
            <Text style={styles.textHoline}>{`v${Constants.manifest.version}`}</Text>
          </View>
        </ScrollView>


      </View >
    );
  }
}


