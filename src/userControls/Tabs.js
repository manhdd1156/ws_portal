import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native";
import { Icon, Tabs as TabsLib, Tab as TabLib, Header, TabHeading, ScrollableTab, Container, Content } from 'native-base';
import { Colors, scale, verticalScale } from '../constants/config';
import { styles } from '../styles/tabsStyle';
export default class Tabs extends Component {
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

