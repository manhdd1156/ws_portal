import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Icon, Tabs as TabsLib, Tab as TabLib, Header, TabHeading, ScrollableTab, Container, Content } from 'native-base';
import { Colors, scale, verticalScale } from '../constants/config';
import { PropsChildrenPropType } from '../libs/componentHelper'
class Tabs extends Component {
  static get propTypes() {
    return {
      children: PropsChildrenPropType.isRequired,
    };
  }

  render() {
    return (
      <Content style={styles.tabView}>
        <TabsLib
          locked
          scrollWithoutAnimation
          tabContainerStyle={styles.tabContainerStyle}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        >
          {this.props.children.map((tab) => {
            return (

              <TabLib
                heading={tab.props.heading}
                tabStyle={styles.tabStyle}
                textStyle={styles.textStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTextStyle={styles.activeTextStyle}
              >
                <View style={styles.viewTabStyle}>
                  {tab.props.children}
                </View>
              </TabLib>

            )
          })}
        </TabsLib>
      </Content >
    );
  }
}
const styles = StyleSheet.create({
  tabView: {
    marginLeft: 10,
    marginRight: 10,
  },
  tabContainerStyle: {
    elevation: 0,
    backgroundColor: 'white',
    flex: 1,
    height: verticalScale(40)
  },
  tabBarUnderlineStyle: {
    height: 0
  },
  tabStyle: {
    backgroundColor: Colors.transparentColor,
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
  },
  textStyle: {
    color: Colors.black
  },
  activeTabStyle: {
    backgroundColor: Colors.transparentColor,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: scale(4),
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  activeTextStyle: {
    color: Colors.black,
    fontWeight: 'bold'
  },
  viewTabStyle: {
    // height: verticalScale(100),
    paddingTop: verticalScale(5),
    borderColor: Colors.black,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: scale(4),
    borderBottomRightRadius: scale(4),
  }
});

export default Tabs;
