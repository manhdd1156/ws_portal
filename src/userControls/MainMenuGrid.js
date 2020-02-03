/*
 19/12/2019    FIT-ManhDD16     Created

*/
import React from "react";
import { View, Text, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { styles } from '../styles/mainMenuGridStyle';
// export default class MainMenuGrid extends Component {
const MainMenuGrid = props => {


  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback
  }
  const {
    onSelect,
    title,
  } = props;
  return (
    < View style={styles.gridItem} >
      <TouchableCmp
        onPress={onSelect}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableCmp>
    </View >
  )

};
export default MainMenuGrid;