/*
 27/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from '../styles/footerStyle';
import { Toast } from 'native-base';
import _ from 'lodash';
import { Translation, useTranslation } from 'react-i18next';

class Footer extends Component {

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    const {
      error, warning, success,
      messages,
    } = self.state;
    console.log('message : ', messages)
    if (messages === '' || messages === null) return (<React.Fragment />);
    const checkType = () => {
      if (warning) return "warning"
      else if (success) return "success"
      else if (error) return "danger"
    }
    if (_.isString(messages)) {
      console.log('string here')
      self.setState({
        error: false,
        messages: '',
      });
      return (
        <Translation>
          {
            (t, { i18n }) => (

              <View>
                {
                  Toast.show({
                    text: i18n.exists(messages) ? t(messages) : messages,
                    textStyle: styles.toastText,
                    buttonText: t('btn.confirm'),
                    duration: 5000,
                    type: checkType()
                  })
                }
              </View>
            )
          }
        </Translation>
      )
    }
    else if (_.isArray(messages)) {
      console.log('array here')
      self.setState({
        error: false,
        messages: '',
      });
      return (
        <Translation>
          {
            (t, { i18n }) => (

              <View>
                {
                  Toast.show({
                    text: messages.map((msg, index) => {
                      const { name, message } = msg;
                      return `${i18n.exists(name) ? t(name) : name} : ${i18n.exists(message) ? t(message) : message} `
                    }),
                    textStyle: styles.toastText,
                    buttonText: t('btn.confirm'),
                    duration: 5000,
                    type: checkType()
                  })
                }
              </View>
            )
          }
        </Translation>
      )
    } else if (error) {
      console.log('end of mess : ', JSON.stringify(messages))
      return (
        <Translation>
          {
            (t, { i18n }) => (
              <View>
                {
                  Toast.show({
                    text: `${messages}`,
                    textStyle: styles.toastText,
                    buttonText: t('btn.confirm'),
                    duration: 5000,
                    type: checkType()
                  })
                }
              </View>
            )
          }
        </Translation>
      )
    }

    return (<React.Fragment />)
  }
}

export default Footer;
