import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from 'native-base'

import DefaultInput from "../../../userControls/DefaultInput";
import HeadingText from "../../../userControls/HeadingText";
import { bindComponentToContext } from '../../../libs/componentHelper';
import ButtonWithBackground from "../../../userControls/ButtonWithBackground";
import logo from '../../../assets/images/fit-logo1.png';
import { APP_NAME } from '../../../constants/config'
import { Translation } from 'react-i18next';
import { Colors, scale } from "../../../constants/config"
import { styles } from '../styles/signinStyle';
import Footer from '../../../userControls/Footer'
const ThisContext = React.createContext({});
export default class Signin extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
    const tempState = {
      ...this.props,
      rememberMe: false,
      showPass: false,
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      controls: {
        email: {
          value: "",
        },
        password: {
          value: "",
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password"
          },
          touched: false
        }
      }
    }

    this.state = tempState;

  }




  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }
  async componentDidMount() {
    const { username, password } = await this.getRememberedUser();
    const { controls } = this.state;
    controls.email.value = username || "";
    controls.password.value = password || "",
      await this.setState({
        controls,
        rememberMe: username ? true : false
      });
  }

  getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (username !== null && password !== null) {
        // We have username!!
        return { username: username, password: password };
      }
      return { username: '', password: '' };
    } catch (error) {
      console.log('error : ', error)
      // Error retrieving data
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error === true) {
      this.setState({ error: true, loading: false, messages: nextProps.messages })
    }
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  authHandler = () => {
    this.setState({
      loading: true,
    })

    const authData = {
      email: this.state.controls.email.value.toLowerCase(),
      password: this.state.controls.password.value
    };
    this.rememberUser();
    const { onTryAuth } = this.props;
    onTryAuth(authData);
  };

  updateInputState = (key, value) => {

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
          }
        }
      };
    });
  };
  toggleRememberMe = async () => {
    await this.setState({ rememberMe: !this.state.rememberMe })
  }
  onShowPass = () => {
    const { showPass } = this.state
    this.setState({ showPass: !showPass })
  }
  rememberUser = async (mode) => {
    try {
      if (this.state.rememberMe === true) {
        await AsyncStorage.setItem('username', this.state.controls.email.value);
        await AsyncStorage.setItem('password', this.state.controls.password.value);
      } else {
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('password');
      }
    } catch (error) {
      console.log('errorr : ', error)
    }
  };
  render() {
    const { loading, showPass, rememberMe, viewMode, controls } = this.state
    let headingText = null;
    let submitButton = (
      <Translation>
        {
          (t) => (
            <ButtonWithBackground
              color={Colors.primaryColor}
              onPress={this.authHandler}

            >
              {t('btn.signin')}
            </ButtonWithBackground>
          )
        }
      </Translation>
    );
    bindComponentToContext(
      [
        Footer
      ],
      ThisContext,
    );
    if (viewMode === "portrait") {
      headingText = (
        <HeadingText>{APP_NAME}</HeadingText>
      );
    }

    if (loading) {
      console.log('button submit is loading ')
      submitButton = <ActivityIndicator size="large" style={{ padding: 12, }} color={Colors.primaryColor} />;
    }

    console.log('render component : ')
    return (
      // <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <Translation>
        {
          (t) => (
            <ThisContext.Provider value={{ self: this }}>
              <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image source={logo} style={styles.imageStyle} />
                {headingText}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={styles.inputContainer}>
                    <DefaultInput
                      placeholder={t('placeholder.username')}
                      style={styles.input}
                      value={controls.email.value}
                      onChangeText={val => this.updateInputState("email", val)}
                      editable={loading ? false : true}
                      keyboardType="email-address"
                      returnKeyType='next'
                    />
                    <View
                      style={
                        viewMode === "portrait"
                          ? styles.portraitPasswordContainer
                          : styles.landscapePasswordContainer
                      }
                    >
                      <View
                        style={
                          viewMode === "portrait"
                            ? styles.portraitPasswordWrapper
                            : styles.landscapePasswordWrapper
                        }
                      >
                        <DefaultInput
                          placeholder={t('placeholder.password')}
                          style={styles.input}
                          value={controls.password.value}
                          onChangeText={val => this.updateInputState("password", val)}
                          editable={loading ? false : true}
                          secureTextEntry={!showPass}
                        />
                        <View style={styles.viewShowPass}>
                          <Icon
                            ios={showPass ? 'ios-eye' : 'ios-eye-off'}
                            android={showPass ? 'ios-eye' : 'ios-eye-off'} style={styles.iconShowPass} type="Ionicons" onPress={this.onShowPass} />
                        </View>
                      </View>

                    </View>
                    <TouchableOpacity style={styles.checkBox} onPress={() => this.toggleRememberMe()}>
                      <Icon
                        ios={rememberMe ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                        android={rememberMe ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} style={styles.iconCheckBox} type="MaterialCommunityIcons" />
                      <Text style={styles.textCheckBox}>{t('btn.remember')}</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>

                {submitButton}
                <Footer />
              </KeyboardAvoidingView>
            </ThisContext.Provider>
          )
        }
      </Translation>
      // </ImageBackground> 
    );
  }
}

