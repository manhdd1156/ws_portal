import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableHighlight,
} from "react-native";
import { styles } from '../styles/buttonWithBackgroundStyle';
const ButtonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : styles.enabled
      ]}
    >
      <Text style={[styles.textButton, props.disabled ? styles.disabledText : styles.enabledText]}>
        {props.children}
      </Text>
    </View>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableHighlight style={styles.touchableHighlight} onPress={props.onPress}>{content}</TouchableHighlight>;
};
export default ButtonWithBackground;