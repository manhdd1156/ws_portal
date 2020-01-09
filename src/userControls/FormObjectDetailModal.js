/*
 31/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Translation } from 'react-i18next';
import PropTypes from 'prop-types';
import { scale, moderateScale, verticalScale, Colors } from '../constants/config'
const ThisContext = React.createContext({});
export default class FormObjectDetailModal extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]).isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  async componentDidMount() {
  }
  _closeSelector = () => {
    const { self } = this.context;
    const { modalVisible } = self.state;
    self.setState({ modalVisible: !modalVisible });
  }
  render() {
    const { self } = this.context;
    const { onSearch, onResetQuery, onModalSearch } = self;
    console.log('modalVisible : ', self.state.modalVisible)
    return (
      <ThisContext.Provider value={{ self: this }}  >
        <View>
          <Modal
            animationType="none"
            transparent
            visible={self.state.modalVisible}
            onRequestClose={this._closeSelector}
          >
            {/* <TouchableWithoutFeedback onPress={this._closeSelector}> */}
            <View style={styles.container}>
            {/* <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={90} enabled={false} style={styles.container}> */}
              {/* <TouchableWithoutFeedback onPress={() => { }}> */}
              <View style={styles.modalView}>
                <ScrollView style={styles.bodyView}>

                  {this.props.children}

                </ScrollView>
                <View style={styles.bottomView}>
                  <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.touchableButton} onPress={this._closeSelector}>
                      <Translation ns="system">
                        {
                          t => (<Text style={styles.textConfirm}>{t('btn.confirm')}</Text>)
                        }
                      </Translation>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
              {/* </TouchableWithoutFeedback> */}
            {/* </KeyboardAvoidingView> */}
            </View>
            {/* </TouchableWithoutFeedback> */}

          </Modal>
        </View>
      </ThisContext.Provider >
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'stretch',
  },
  modalView: {
    paddingTop: verticalScale(10),
    // width: Dimensions.get("window").width * 0.9,
    // height: Dimensions.get("window").height * 0.8,
    // backgroundColor: 'white',
    // borderRadius: scale(9),
    // paddingBottom: 0,
    // overflow: 'hidden'
    overflow: 'hidden',
                marginHorizontal: 18,
                marginVertical: 26,
                borderRadius: 6,
                alignSelf: 'stretch',
                flex: 1,
                backgroundColor: 'white',
  },
  bodyView: {
    flex: 0.8
  },
  elementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: scale(10),
    paddingRight: scale(10)
  },
  dateElementView: {
    // flex: 0.55,
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    // marginTop: verticalScale(6),
    // marginBottom: verticalScale(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 23
  },
  inputView: {
    flex: 0.55,
  },
  inputFields: {
    borderWidth: 1,
    height: verticalScale(30),
    borderColor: Colors.black,
    borderRadius: 23,
  },

  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(5)
  },
  title: {
    color: Colors.black,
    fontSize: moderateScale(16)
  },
  labelView: {
    flex: 0.4,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  orderStateView: {
    borderColor: Colors.black,
    borderWidth: 1,
    flex: 0.55,
    borderRadius: 23,
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
  inputDateView: {
  },
  label: {
    color: Colors.black,
    fontSize: moderateScale(14)
  },
  lineheight: {
    flex: 0.9,
    width: 1,
    backgroundColor: 'white'
  },
  textConfirm: {
    color: 'white',
    fontSize: moderateScale(16)
  },
  icon: {
    color: Colors.primaryColor
  },
  bottomView: {
    // flex: 0.18,
    height: verticalScale(50),
    justifyContent: 'space-between',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  buttonView: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'stretch',
  },
  touchableButton: {
    justifyContent: 'center',
    flex: 1,
    // width: Dimensions.get('window').width * 1,
    alignItems: 'center',
  }
});