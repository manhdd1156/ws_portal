/*
 31/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Translation } from 'react-i18next';
import PropTypes from 'prop-types';
import { styles } from '../styles/formObjectDetailModalStyle';
import {_closeSelector } from '../functions/formObjectDetailModalFunction';
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

    this._closeSelector = _closeSelector.bind(this);
    this.state = {
      ...this.state,
    };
  }
  async componentDidMount() {
  }
  // _closeSelector = () => {
  //   const { self } = this.context;
  //   const { modalVisible } = self.state;
  //   self.setState({ modalVisible: !modalVisible });
  // }
  render() {
    const { self } = this.context;
    const { onSearch, onResetQuery, onModalSearch } = self;
    return (
      <ThisContext.Provider value={{ self: this }}  >
        <View>
          <Modal
            animationType="none"
            transparent
            visible={self.state.modalVisible}
            onRequestClose={() => this._closeSelector(this)}
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <ScrollView style={styles.bodyView}>

                  {this.props.children}

                </ScrollView>
                <View style={styles.bottomView}>
                  <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.touchableButton} onPress={() => this._closeSelector(this)}>
                      <Translation ns="system">
                        {
                          t => (<Text style={styles.textConfirm}>{t('btn.confirm')}</Text>)
                        }
                      </Translation>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          </Modal>
        </View>
      </ThisContext.Provider >
    );
  }

}
