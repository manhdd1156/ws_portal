/*
 26/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from "react";
import {
  Text,
  View,
} from "react-native";
import { Textarea } from "native-base"
import PropTypes from 'prop-types';

import { Translation } from 'react-i18next';
import { Colors } from '../constants/config';
// import { fieldErrorSelector } from '../libs/errorHelper';
import { styles } from '../styles/textAreaFieldStyle';
import { onValueChange } from '../functions/textAreaFieldFunction';
export default class TextAreaField extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      alt: PropTypes.string,
      onChange: PropTypes.func,
      label: PropTypes.bool,
      readOnly: PropTypes.bool,
      style: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      placeholder: '',
      alt: '',
      onChange: undefined,
      label: true,
      readOnly: false,
      style: {},
    };
  }
  constructor(props) {
    super(props);

    this.onValueChange = onValueChange.bind(this,this);
  }
  // onValueChange(text) {
  //   const { name } = this.props;
  //   const { onChange } = this.context.self;
  //   const data = { type: 'input.textField', name, value: text };
  //   // console.log('this : ', this)
  //   onChange(data);
  // }
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const { name, placeholder, readOnly, alt, label } = this.props;

    const userDefinedOnChange = this.props.onChange;
    const { state, onChange } = self;
    const title = (alt !== '') ? alt : name;

    const {
      model, object, query,
      error, messages, style,
    } = state;

    const fieldType = model[name];

    if (!fieldType) {
      console.warn(`Field ${name} is not existed!`);
      return (<React.Fragment />);
    }

    if (readOnly) {
      return (
        <Translation>
          {
            (t, { i18n }) => (
              <View style={styles.areaFieldView}>
                <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}</Text></View>
                <Textarea rowSpan={3} bordered value={query ? query[name] : object[name]} style={[styles.textArea, style]} editable={false} />
              </View>

            )
          }
        </Translation>);
    }

    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.areaFieldView}>
              <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}</Text></View>

              <Textarea rowSpan={3} bordered value={query ? query[name] : object[name]} placeholder={placeholder}
                onChange={userDefinedOnChange || this.onValueChange}
                placeholderTextColor={Colors.placeholderTextColor} editable={false}
                style={[styles.textArea, style]}
              />
              {/* {(error && fieldErrorSelector(name, messages)) ? <Text>{label && (i18n.exists(title) ? t(title) : title)} {t('msg.delete.failure')} </Text> : null} */}
            </View>
          )
        }
      </Translation>);
  }
}
