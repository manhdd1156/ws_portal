/*
 16/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import PropTypes from 'prop-types';
import { scale, moderateScale, verticalScale, Colors } from '../constants/config';
import { fieldErrorSelector } from '../libs/errorHelper';
import { getFieldAttribute } from '../libs/commonHelper';
import { Translation } from 'react-i18next';
class TextField extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      // type: PropTypes.string,
      placeholder: PropTypes.string,
      readOnly: PropTypes.bool,
      label: PropTypes.bool,
      alt: PropTypes.string,
      onChange: PropTypes.func,
      returnKeyType: PropTypes.string,
    };
  }
  static get defaultProps() {
    return {
      // type: 'text',
      placeholder: '',
      readOnly: false,
      label: true,
      alt: '',
      onChange: undefined,
      style: {},
      returnKeyType: 'default',
    };
  }
  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(text) {
    const { name } = this.props;
    const { onChange } = this.context.self;
    const data = { type: 'input.textField', name, value: text };
    // console.log('this : ', this)
    onChange(data);
  }

  render() {

    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      name, returnKeyType,
      // name, type,
      placeholder, readOnly,
      label, alt, style,
    } = this.props;

    const userDefinedOnChange = this.props.onChange;
    const { error, messages } = self.state;
    const { fieldType, fieldValue } = getFieldAttribute(self, name);
    const required = fieldType ? fieldType.required : false;
    const translated = fieldType ? fieldType.translated : false;
    const title = (alt !== '') ? alt : name;
    if (readOnly) {
      return (
        <Translation>
          {
            (t, { i18n }) => (
              <View style={styles.textFieldView}>
                <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{required ? '*' : null}</Text></Text></View>
                {/* <View style={[ styles.textInput , style]}>
                  
                  <Text>{(translated && (i18n.exists(fieldValue))) ? t(fieldValue) : fieldValue}</Text>
                </View> */}
                <ScrollView nestedScrollEnabled={true} keyboardDismissMode='on-drag' horizontal style={[styles.textInput, style]}>

                  <TextInput
                    underlineColorAndroid="transparent"
                    value={(translated && (i18n.exists(fieldValue))) ? t(fieldValue) : fieldValue}
                    // style={[styles.textInput, style]}
                    // placeholder={placeholder}
                    // placeholderTextColor={Colors.placeholderTextColor}
                    editable={false}
                  />

                </ScrollView>
              </View>
            )
          }
        </Translation >);
    }

    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.textFieldView}>
              <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{required ? '*' : null}</Text></Text></View>
              <TextInput
                underlineColorAndroid="transparent"
                value={fieldValue}
                onChangeText={userDefinedOnChange || this.onValueChange}    // nếu là onChange thì giá trị trả về là {  nativeEvent: { eventCount, target, text} }
                style={[styles.textInput, style]}
                placeholder={placeholder}
                placeholderTextColor={Colors.placeholderTextColor}
                returnKeyType={returnKeyType}
              />
              {(error && fieldErrorSelector(name, messages)) ? <Text>{label && (i18n.exists(title) ? t(title) : title)} {t('msg.delete.failure')} </Text> : null}
            </View>
          )
        }
      </Translation >);

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
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    height: verticalScale(35),
    borderColor: Colors.black,
    borderRadius: scale(4),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(5),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
});

export default TextField;
