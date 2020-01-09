/*
 25/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
// import { Message, Step } from 'semantic-ui-react';
import { Colors, moderateScale, verticalScale, scale } from '../constants/config';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';

class FormWorkFlow extends Component {
  static get propTypes() {
    return {
      steps: PropTypes.arrayOf(PropTypes.object).isRequired,
      active: PropTypes.number.isRequired,
      style: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      style: {},
    };
  }

  render() {
    const { steps, style, active } = this.props;
    // if (!steps || !active || steps.length === 0) { console.log('in here', steps, active, steps.length); return <React.Fragment /> }
    const defaultStyles = {
      stepIndicatorSize: moderateScale(28),
      currentStepIndicatorSize: moderateScale(38),
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 4,
      stepStrokeCurrentColor: '#fe7013',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#fe7013',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#fe7013',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor: '#fe7013',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: moderateScale(14),
      currentStepIndicatorLabelFontSize: moderateScale(14),
      stepIndicatorLabelCurrentColor: '#fe7013',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      labelColor: '#999999',
      labelSize: moderateScale(14),
      currentStepLabelColor: '#fe7013',
    };
    if (steps.length > 5) {
      return (
        < ScrollView horizontal >
          <View style={[styles.workFlowView, { width: (Dimensions.get('window').width / 4) * steps.length }]}> 
            <StepIndicator
              customStyles={StyleSheet.flatten([defaultStyles, style])}
              currentPosition={active}
              labels={steps}
              stepCount={steps.length}
            />
          </View>
        </ScrollView >)
    }
    return (
      <View style={styles.workFlowView}>
        <StepIndicator
          customStyles={StyleSheet.flatten([defaultStyles, style])}
          currentPosition={active}
          labels={steps}
          stepCount={steps.length}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  workFlowView: {
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(5)
  },
})
export default FormWorkFlow;

