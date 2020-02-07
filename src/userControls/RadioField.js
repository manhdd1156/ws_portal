/*
 08/01/2020    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { Translation } from 'react-i18next';
import { styles } from '../styles/radioFieldStyle';
import { getFieldAttribute } from '../libs/commonHelper';
import { onValueChange } from '../functions/radioFieldFunction';

export default class RadioField extends Component {
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

    this.onValueChange = onValueChange.bind(this, this);
  }
  // onValueChange(value) {
  //   const { name } = this.props;
  //   const { onChange } = this.context.self;
  //   const data = { type: 'radio', name, checked: !value, };
  //   onChange(data);
  // }
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
                {fieldValue ? <Icon active style={styles.toggleOnStyle} ios='toggle-on' android='toggle-on' type='FontAwesome' />
                  : <Icon active style={styles.toggleOffStyle} ios='toggle-off' android='toggle-off' type='FontAwesome' />
                }
                <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{fieldType.required ? '*' : null}</Text></Text></View>
              </View>
            </TouchableOpacity>
          )
        }
      </Translation>);
  }
}
