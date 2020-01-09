import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Platform, TouchableNativeFeedback, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import { Colors, roles } from '../constants/config';
import { scale, moderateScale, verticalScale } from '../constants/config';
// export default class MainMenuGrid extends Component {
const MainMenuGrid = props => {


  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  const {
    onSelect,
    iconState, iconName,
    iconType, title,
  } = props;
  // console.log('onSelect :', onSelect)
  return (
    < View style={styles.gridItem} >
      <TouchableCmp
        onPress={onSelect}
      // disabled={iconState === 'active' ? false : true}
      >
        {/* <View style={[styles.container]}>
            <Icon
              ios='ios-eye'
              android='ios-eye' type="Ionicons" />
              <Text>fsafsdfds</Text>
          </View> */}

        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableCmp>
    </View >
  )

};

const styles = StyleSheet.create({
  gridItem: {
    margin: 15,
    width: Dimensions.get('window').width / 2 - 20,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  iconType: {
    flex: 5 / 8
  },
  title: {
    // flex: 4 / 8,
    // fontFamily: 'open-sans-bold',
    fontSize: moderateScale(17),
    // textAlign: 'center',
    color: Colors.primaryColor
  },

});


export default MainMenuGrid