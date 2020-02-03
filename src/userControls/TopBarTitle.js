import React from "react";
import { Text, StyleSheet, Platform, View, Dimensions } from "react-native";
import { scale, moderateScale, verticalScale, Colors } from '../constants/config';
const TopBarTitle = props => (
  <View style={Platform.OS === 'android' ? styles.headerTitleAndroid : styles.headerTitleIOS}>
    <Text style={styles.textTitle}>{props.functionName}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerTitleAndroid: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(-50),
    width: Dimensions.get('window').width + scale(50),
  },
  headerTitleIOS: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  textTitle: {
    // fontFamily: 'open-sans-bold',
    color: Colors.black,
    fontSize: 23,
  }
});

export default TopBarTitle;
