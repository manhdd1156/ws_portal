import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, CameraRoll, Image, StyleSheet, Modal, } from 'react-native';
import * as Permissions from 'expo-permissions';
import CalendarPicker from 'react-native-calendar-picker';
import { scale, moderateScale, verticalScale, Colors, months, weekdays } from '../constants/config'
import { Icon } from 'native-base';
import * as FileSystem from 'expo-file-system';
export default class CalendarScreen extends Component {

  constructor(props) {
    super(props);
    console.log('calendar here ')
    this.state = {
      ...this.state,
    };
    // console.log('this.context :', this.context)
    this.onDateChange = this.onDateChange.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }
  async componentDidMount() {
  }
  onDateChange(date) {
    console.log(date)
    this.context.self.setState({
      selectedStartDate: date,
    });

  }
  setModalVisible(visible) {
    const { typeCalendar, selectedStartDate } = this.context.self.state;
    const { searchOption } = this.context.self.context.self.state;
    if (typeCalendar === 'fromdate') {
      searchOption.fromDate = selectedStartDate;
      this.context.self.setState({
        modalCalendarVisible: visible,
      });

    } else {
      searchOption.toDate = selectedStartDate;
      this.context.self.setState({
        modalCalendarVisible: visible,
      });
    }
    this.context.self.context.self.setState({
      searchOption
    })
  }
  render() {

    const { self } = this.context;
    console.log('Calendar screen :');
    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <Modal
        overlayColor={Colors.transparentColor}
        animationType="fade"
        transparent={true}
        visible={self.state.modalCalendarVisible ? self.state.modalCalendarVisible : false}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}

      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <CalendarPicker
              onDateChange={this.onDateChange}
              startFromMonday={true}
              previousTitle={<Icon ios='ios-arrow-round-back' android="ios-arrow-round-back" style={styles.icon} type="Ionicons" />}
              nextTitle={<Icon ios='ios-arrow-round-forward' android="ios-arrow-round-forward" style={styles.icon} type="Ionicons" />}
              weekdays={weekdays}
              months={months}
              todayBackgroundColor={Colors.grey}
              selectedDayColor={Colors.primaryColor}
              width={Dimensions.get("window").width * 0.9}
            />
            {/* <View>
                <Text>SELECTED DATE:{startDate}</Text>
              </View> */}

            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!self.state.modalCalendarVisible);
                }}>
                <Text style={styles.textConfirm}>Xong</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(80,80,80,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.5,
    backgroundColor: 'white',
    borderRadius: 7,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 1,
  },
  textConfirm: {
    color: Colors.black,
    fontSize: moderateScale(16)
  },
  icon: {
    color: Colors.primaryColor
  },
});