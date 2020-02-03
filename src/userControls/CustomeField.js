/*
 07/01/2020    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import { styles } from '../styles/customeFieldStyle'
class CustomeField extends Component {
  static get propTypes() {
    return {
      children: PropTypes.object.isRequired,
      label: PropTypes.bool,
      alt: PropTypes.string,

    };
  }
  static get defaultProps() {
    return {
      label: true,
      alt: '',
      style: {},
    };
  }
  render() {

    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      name, label, alt, children
    } = this.props;
    const title = (alt !== '') ? alt : name;
    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.textFieldView}>
              <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}</Text></View>
              {children}
            </View>
          )
        }
      </Translation >);
  }
}



export default CustomeField;
