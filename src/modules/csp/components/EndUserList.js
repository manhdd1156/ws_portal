/*
 14/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";

import { bindComponentToContext } from '../../../libs/componentHelper';

import { initComponent, loadComponentData, onUpdate } from '../../../libs/listComponentHelper'; // [!] component LIST helper


import { scale, moderateScale, verticalScale, Colors } from '../../../constants/config';
import AdvancedSearchScreen from '../../../userControls/AdvancedSearchScreen'

// import DefaultFlatList from "../../../userControls/DefaultFlatList";
import TextField from "../../../userControls/TextField";
import ListSearchResult from "../../../userControls/ListSearchResult";
import DateField from "../../../userControls/DateField";
import ListActionList from "../../../userControls/ListActionList";
import { ACTIVE_OPTIONS } from '../constants/renderSetting';

import ListModalRow from "../../../userControls/ListModalRow";
import SelectionField from "../../../userControls/SelectionField";
const ThisContext = React.createContext({});
export default class EndUserList extends Component {
  constructor(props) {
    
    super(props);
   
    initComponent(this, props);
    const currentDate = new Date();
    this.state = {
      ...this.state,
      textSearch: '',
      searchBar: false,
      // index: 0,
      page: [1, 1, 1, 1],
      goToObject: false,
      refreshing: false,
      // modalVisible: false,
      resultSearch: false,
      // rowOpen: null, //default row is Open
      objectList: [],

    };
  }

  async componentDidMount() {
    await loadComponentData(this);
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.props.navigation.replace(this.props.baseUrl) // fix lỗi khi goBack từ màn hình detail không load lại data ( chưa phải là cách tối ưu)
      }
    );
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    const { errorMessage } = this.props;
    // console.log('errorMessage here', errorMessage)
    if (nextProps.errorMessage !== errorMessage && nextProps.errorMessage !== '') {
      Alert.alert(
        nextProps.errorMessage,
        '',
        [{ text: 'OK', onPress: () => { this.setState({ loading: false }); } }],
      );
    }
  }


  render() {
    const redirectInjection = this.onRedirect();
    console.log('redirectInjection : ', redirectInjection)
    if (redirectInjection) { console.log('have redirectInjection'); return redirectInjection; }

    const { objectList, objectListTotal,
      loading, textSearch, index,
      refreshing, resultSearch,
    } = this.state;

    bindComponentToContext(
      [
        AdvancedSearchScreen, ListActionList,
        ListModalRow, TextField, SelectionField, DateField, ListSearchResult
      ],
      ThisContext,
    );
    console.log('eeeee',this.state)
    
    const lineList = [
      ['customerOracleCode', 'active'],
      ['customerName'],
      // ['uomName'],
    ];
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
      TouchableCmp = TouchableNativeFeedback
    }
    
    return (
      <ThisContext.Provider value={{ self: this }}>
        <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
          <AdvancedSearchScreen>

            <ListModalRow>
              <TextField name='customerName' />
              <TextField alt="customerOracleListCode" name="customerOracleCode" />
              
            </ListModalRow>

            <ListModalRow>
              <TextField name='taxCode' />
              <TextField name="userName" alt="salesmanId" />
              
            </ListModalRow>


            <ListModalRow>
             <SelectionField name='active' options={ACTIVE_OPTIONS} layout='modal' />
              
            </ListModalRow>

          </AdvancedSearchScreen >
          <ListActionList />
          <ListSearchResult lines={lineList} keyField="offerId" />
        </View >
      </ThisContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputSearch: {
    color: Colors.black,
    fontSize: moderateScale(15),
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  loadingScreen: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(5)
  },
  sectionHeaderView: {
    // paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
  },
  sectionHeaderText: {
    color: 'black',
    // fontFamily: 'open-sans-bold',
    fontSize: moderateScale(16)
  },
  resultSearchView: {
    flex: 0.1,
    alignItems: 'center'
  },
  timeView: {
    position: 'absolute',
    flex: 1,
    top: 0,
    right: verticalScale(5),
    color: Colors.primaryColor,
    fontSize: moderateScale(14)
  },
  resultSearchText: {
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  inactiveTextStyle: {
    color: Colors.grey,
    fontSize: moderateScale(14),
  },
  activeTextStyle: {
    color: Colors.primaryColor,
    fontSize: moderateScale(14),
  },
  inactiveTabStyle: {
    backgroundColor: Colors.transparentColor,
  },
  activeTabStyle: {
    backgroundColor: Colors.transparentColor,
  },
  iconTab: {
    marginRight: -5,
  },
  tabView: {
    flex: 1,
    paddingLeft: 19
  },
  addressText: {
    color: Colors.grey,
    fontSize: moderateScale(14),
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rowFront: {
    backgroundColor: 'white',
    // height: 55
    paddingBottom: verticalScale(5)
  },
});
