/*
 06/01/2020    FIT-ManhDD16     Created

*/
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Translation } from 'react-i18next';
import { View, Text, TextInput } from 'react-native'
import { fieldErrorSelector } from '../libs/errorHelper';
import { getFieldAttribute } from '../libs/commonHelper';
import {styles} from '../styles/numberFieldStyle';
import { onValueChange } from '../functions/numberFieldFunction';

export default class NumberField extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      label: PropTypes.bool,
      readOnly: PropTypes.bool,
      alt: PropTypes.string,
      style: PropTypes.object,
      layout: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      placeholder: '',
      label: true,
      readOnly: false,
      alt: '',
      style: {
        // textAlign: 'right',
        // width: 150,
        width: 650,
      },

    };
  }

  constructor(props) {
    super(props);

    this.onValueChange = onValueChange.bind(this, this);
  }

  // onValueChange(values) {
  //   const { name } = this.props;
  //   const { self } = this.context;
  //   const { onChange } = self;
  //   console.log('value input text : ', values)
  //   const data = { type: 'input.numberField', name, value: values };

  //   onChange(data);
  // }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      name, placeholder,
      label, readOnly,
      style, alt,
    } = this.props;
    const userDefinedOnChange = this.props.onChange;
    const { error, messages } = self.state;
    const { fieldType, fieldValue } = getFieldAttribute(self, name);
    const title = (alt !== '') ? alt : name;
    const translated = fieldType ? fieldType.translated : false;
    // console.log('numberField : fieldType, fieldValue,title :', fieldType, fieldValue, title)
    if (readOnly) {
      return (
        <Translation>
          {
            (t, { i18n }) => (
              <View style={styles.textFieldView}>
                <View style={styles.labelView}><Text style={styles.label}> {label && (i18n.exists(title) ? t(title) : title)}</Text></View>

                <NumberFormat
                  value={(translated && (i18n.exists(fieldValue))) ? t(fieldValue) : fieldValue}
                  thousandSeparator="."
                  decimalSeparator=","
                  displayType="text"

                  renderText={value => (
                    <Text style={styles.textReadOnly}>{value}</Text>
                  )}
                />
              </View>
            )
          }
        </Translation>
      );
    }

    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.textFieldView}>
              <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{fieldType.required ? '*' : null}</Text></Text></View>

              <NumberFormat
                name={name}
                value={fieldValue}
                // customInput={Text}
                displayType={'text'}
                placeholder={placeholder}
                // onValueChange={this.onValueChange}
                thousandSeparator="."
                decimalSeparator=","
                error={error ? fieldErrorSelector(name, messages) : false}
                // TODO: add style to get WARNING effect
                // style={[style]}
                renderText={value => (
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={placeholder}
                    value={value}
                    keyboardType="numeric"
                    onChangeText={userDefinedOnChange || this.onValueChange}
                    style={[styles.textInput, style]}
                  />
                )}
              />
            </View>)
        }
      </Translation>
    );
  }
}
