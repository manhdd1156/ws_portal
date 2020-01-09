/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { format } from 'date-and-time';
import { Translation } from 'react-i18next';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Modal,
  Alert,
  StatusBar,
  Platform,
  Picker,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Icon } from 'native-base';
import { DATE_FORMAT, scale, moderateScale, verticalScale, Colors, months, weekdays } from '../constants/config';
import CalendarPicker from 'react-native-calendar-picker';
import { fieldErrorSelector } from '../libs/errorHelper';
import TextField from './TextField'
import { getFieldAttribute } from '../libs/commonHelper';
import { OPERATOR_SIGN, OPERATOR_REPLACER } from '../libs/constants/mongoOperator';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

class DateField extends React.Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      alt: PropTypes.string,
      label: PropTypes.bool,
      readOnly: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      placeholder: DATE_FORMAT,
      label: true,
      alt: '',
      readOnly: false,
    };
  }

  constructor(props) {
    super(props);

    this.onValueChange = this.onValueChange.bind(this);

    this.state = {
      selector: false,
      // searchTerm: '',
      // highlightedChildren: [],
    }
  }

  onValueChange(choosenDate) {
    const { self } = this.context;
    const { name } = this.props;
    const { onChange } = self;

    const value = choosenDate ? choosenDate.toDate() : null;
    const data = { type: 'input.date', name, value };

    onChange(data);
  }

  _toggleSelector = () => {
    const newState = !this.state.selector
    this.setState({
      selector: newState,
    })
  }

  _closeSelector = () => {
    this.setState({
      selector: false,
      // searchTerm: '',
    })
  }
  _submitSelection = () => {
    // const { onConfirm } = this.props
    this._toggleSelector()
    // reset searchTerm
    // this.setState({ searchTerm: '' })
    // onConfirm && onConfirm()
  }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      name, placeholder,
      label, readOnly, alt,
    } = this.props;

    const { error, messages } = self.state;
    const { selector } = this.state
    const { fieldType, fieldValue } = getFieldAttribute(self, name);
    const required = (fieldType && fieldType.required) ? fieldType.required : false;
    const fieldName = name.replace(OPERATOR_SIGN, OPERATOR_REPLACER);
    const title = (alt !== '') ? alt : name;

    if (readOnly) {
      return (
        <Translation>
          {
            (t, { i18n }) => (
              <View style={styles.textFieldView}>
                <View style={styles.labelView}><Text style={styles.label}>{label && (i18n.exists(title) ? t(title) : title)}<Text style={styles.required}>{required ? '*' : null}</Text></Text></View>
                {/* <TextField
                  underlineColorAndroid="transparent"
                  value={fieldValue ? format(new Date(fieldValue), DATE_FORMAT) : ''}
                  style={[layout === 'screen' ? styles.textInputScreen : styles.textInputModal, style]}
                  editable={false}
                /> */}
                <View
                  style={[
                    {
                      flex: 1,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    styles.selectToggle,
                  ]}
                >
                  <Text style={styles.inputDateView} >{fieldValue ? format(new Date(fieldValue), DATE_FORMAT) : ''}</Text>
                  <Icon
                    ios='ios-calendar'
                    android="ios-calendar"
                    type="Ionicons"
                    style={{ fontSize: scale(20), color: Colors.primaryColor, }}
                  />
                </View>
              </View>
            )
          }
        </Translation>);
    }
    return (
      <Translation>
        {
          (t, { i18n }) => (
            <View style={styles.textFieldView}>
              <Modal
                overlayColor={Colors.transparentColor}
                animationType="fade"
                transparent
                visible={selector}
                onRequestClose={this._closeSelector}
              >
                <View style={styles.container}>
                  <View style={styles.modalView}>
                    <CalendarPicker
                      onDateChange={this.onValueChange}
                      startFromMonday={true}
                      previousTitle={<Icon ios='ios-arrow-round-back' android="ios-arrow-round-back" style={styles.icon} type="Ionicons" />}
                      nextTitle={<Icon ios='ios-arrow-round-forward' android="ios-arrow-round-forward" style={styles.icon} type="Ionicons" />}
                      weekdays={weekdays}
                      months={months}
                      todayBackgroundColor={Colors.secondaryColor}
                      selectedDayColor={Colors.primaryColor}
                      width={Dimensions.get("window").width * 0.9}
                    />

                    <Touchable
                      accessibilityComponentType="button"
                      onPress={this._submitSelection}
                      style={{ flex: 1, alignSelf: 'stretch', borderColor: 'red', borderWidth: 1, marginTop: verticalScale(10) }}
                    >
                      <View
                        style={{
                          flex: Platform.OS === 'android' ? 1 : 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: verticalScale(50),
                          // paddingVertical: verticalScale(8),
                          // paddingHorizontal: 16,
                          borderRadius: 0,
                          flexDirection: 'row',
                          backgroundColor: Colors.primaryColor,
                        }}
                      >
                        <Text style={styles.textConfirm}>{t('btn.confirm')}</Text>
                      </View>
                    </Touchable>

                  </View>
                </View>
              </Modal>
              <View style={styles.labelView}>
                <Text style={styles.label}>
                  {(label && (i18n.exists(title) ? t(title) : title) ? label && (i18n.exists(title) ? t(title) : title) : (i18n.exists(fieldName) ? t(fieldName) : fieldName))}
                  <Text style={styles.required}>
                    {required ? '*' : null}
                  </Text>
                </Text>
              </View>

              <TouchableWithoutFeedback
                onPress={this._toggleSelector}
              >
                <View
                  style={[
                    {
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    styles.selectToggle,
                  ]}
                >
                  <Text style={styles.inputDateView} >{fieldValue ? format(new Date(fieldValue), DATE_FORMAT) : ''}</Text>
                  <Icon
                    ios='ios-calendar'
                    android="ios-calendar"
                    type="Ionicons"
                    style={{ fontSize: scale(20), color: Colors.primaryColor, }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        }
      </Translation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.52,
    backgroundColor: 'white',
    borderRadius: scale(9),
    overflow: 'hidden',
    // paddingBottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  selectToggle: {
    borderRadius: scale(4),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
    borderColor: Colors.black,
    borderWidth: 1,
    paddingLeft: scale(5),
    height: verticalScale(35)
  },
  textConfirm: {
    color: '#ffffff',
    fontSize: moderateScale(18)
  },
  icon: {
    color: Colors.primaryColor
  },
  inputDateView: {
    flex: 0.95,
    fontSize: moderateScale(14),
    color: Colors.black,
  },
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
});

export default DateField;

