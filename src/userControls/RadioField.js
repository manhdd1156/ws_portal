/*
 8/01/2020    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { scale, moderateScale, verticalScale, Colors } from '../constants/config';
import { Translation } from 'react-i18next';

import { getFieldAttribute } from '../libs/commonHelper';

class RadioField extends React.Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      label: PropTypes.bool,
      alt: PropTypes.string,
      onChange: PropTypes.func,
      disabled: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      label: true,
      alt: '',
      onChange: undefined,
      disabled: false,
    };
  }
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(value) {
    const { name } = this.props;
    const { onChange } = this.context.self;
    const data = { type: 'radio', name, checked: !value, };
    onChange(data);
  }
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { name, label, disabled, alt } = this.props;
    const userDefinedOnChange = this.props.onChange;
    const { fieldType, fieldValue } = getFieldAttribute(self, name);
    const title = (alt !== '') ? alt : name;

    return (
      <Translation>
        {
          (t, { i18n }) => (
            <TouchableOpacity onPress={userDefinedOnChange || this.onValueChange(fieldValue)}>
              <View>
                {fieldValue ? <Icon active style={{ fontSize: moderateScale(16), color: Colors.tertiaryColor }} ios='toggle-on' android='toggle-on' type='FontAwesome' />
                  : <Icon active style={{ fontSize: moderateScale(16), color: Colors.grey }} ios='toggle-off' android='toggle-off' type='FontAwesome' />
                }
                <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{fieldType.required ? '*' : null}</Text></Text></View>
              </View>
            </TouchableOpacity>
          )
        }
      </Translation>);
  }
}
const styles = StyleSheet.create({
  textFieldView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  labelView: {
    justifyContent: 'flex-start'
  },
  sectionView: {
    borderRadius: scale(4),
  },
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },

});
export default RadioField;
