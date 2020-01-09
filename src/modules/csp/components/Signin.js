import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AsyncStorage,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from 'native-base'
import PropTypes from 'prop-types';

import DefaultInput from "../../../userControls/DefaultInput";
import HeadingText from "../../../userControls/HeadingText";
import { bindComponentToContext } from '../../../libs/componentHelper';
// import MainText from "../../../userControls/MainText";
import ButtonWithBackground from "../../../userControls/ButtonWithBackground";
// import backgroundImage from '../../../assets/images/background.png';
import logo from '../../../assets/images/fit-logo1.png';
import { APP_NAME } from '../../../constants/config'
// import { validate } from "../../../libs/commonHelper";
import { Translation } from 'react-i18next';
import { Colors, scale } from "../../../constants/config"
import { initComponent } from '../../../libs/listComponentHelper'; // [!] component LIST helper
import Footer from '../../../userControls/Footer'
// import { clearLoginErrorMessage, login } from '../actions/authAction';
const ThisContext = React.createContext({});
export default class Signin extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);

    // initComponent(this, props)
    // this.secondTextInput = React.createRef();
    const tempState = {
      ...this.props,
      rememberMe: false,
      showPass: false,
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
      controls: {
        email: {
          value: "",
          // valid: false,
          // validationRules: {
          //   isEmail: true
          // },
          // touched: false
        },
        password: {
          value: "",
          // valid: false,
          // validationRules: {
          //   minLength: -1
          // },
          // touched: false
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
    // this.props.onAutoSignIn();
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
    const { error, messages } = this.props;
    console.log('errorMessage here 1 :', this.props.error)
    console.log('errorMessage here 2 :', nextProps.error)
    // if (nextProps !== this.props) {
    //   this.state = { ...this.state, nextProps }
    // }
    if (nextProps.error === true) {
      // Alert.alert(
      //   nextProps.messages,
      //   '',
      //   [{ text: 'OK', onPress: () => { this.props.clearLoginErrorMessage(); } }],
      // );
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
        // <MainText>
        <HeadingText>{APP_NAME}</HeadingText>
        // </MainText>
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
                <Image source={logo} style={{ width: Dimensions.get('window').width * 0.31, height: Dimensions.get('window').width * 0.31 }} />
                {headingText}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                  <View style={styles.inputContainer}>
                    <DefaultInput
                      placeholder={t('placeholder.username')}
                      style={styles.input}
                      value={controls.email.value}
                      onChangeText={val => this.updateInputState("email", val)}
                      // valid={controls.email.valid}
                      // valid={true}
                      // touched={controls.email.touched}
                      // touched={true}
                      // autoCapitalize="none"
                      // autoCorrect={false}
                      editable={loading ? false : true}
                      keyboardType="email-address"
                      returnKeyType='next'
                    // onSubmitEditing={() => this.customInput2.refs.innerTextInput2.focus()}
                    // blurOnSubmit={false}
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
                          // valid={controls.password.valid}
                          // touched={controls.password.touched}
                          // touched={true}
                          editable={loading ? false : true}
                          // ref={ref => this.customInput2 = ref}
                          // refInner="innerTextInput2"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%",
    paddingBottom: 30,
  },
  input: {
    // backgroundColor: "#fff",
    // borderColor: "#4f4f4f",
    padding: 15,
    paddingVertical: 10,

  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  checkBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  iconCheckBox: {
    color: Colors.grey,
  },
  viewShowPass: {
    justifyContent: 'center',
    position: 'absolute',
    right: scale(10),
    height: '100%'
  },
  iconShowPass: {
    // position: 'absolute',
    color: Colors.black
  },
  textCheckBox: {
    color: Colors.grey,
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});


// Signin.propTypes = {
//   errorMessage: PropTypes.string.isRequired,
//   loggingIn: PropTypes.bool.isRequired,
//   login: PropTypes.func.isRequired,
// };
