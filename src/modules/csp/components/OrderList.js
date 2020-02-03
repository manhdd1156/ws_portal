/*
 14/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import { View } from "react-native";
import { bindComponentToContext } from '../../../libs/componentHelper';
import { initComponent, loadComponentData, onUpdate } from '../../../libs/listComponentHelper'; // [!] component LIST helper
import AdvancedSearchScreen from '../../../userControls/AdvancedSearchScreen'
import { ORDER_STATE, ORDER_STATE_LIST } from '../constants/orderStateConstants';
import TextField from "../../../userControls/TextField";
import ListSearchResult from "../../../userControls/ListSearchResult";
import DateField from "../../../userControls/DateField";
import ListActionList from "../../../userControls/ListActionList";
import ListRow from "../../../userControls/ListRow";
import SelectionField from "../../../userControls/SelectionField";
import ListTitle from "../../../userControls/ListTitle";
import ListBody from "../../../userControls/ListBody"
import { styles } from '../styles/orderListStyle';
import Footer from "../../../userControls/Footer"
import { ACTIVE_OPTIONS } from '../constants/renderSetting';
const ThisContext = React.createContext({});
export default class OrderList extends Component {
  constructor(props) {
    super(props);
    initComponent(this, props);

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

  render() {
    this.onRedirect();
    const { loading } = this.state;
    bindComponentToContext(
      [
        ListTitle, ListBody, AdvancedSearchScreen, ListActionList,
        ListRow, TextField, SelectionField, DateField, ListSearchResult
      ],
      ThisContext,
    );
    const stateList = [
      { key: ORDER_STATE.DRAFT, value: ORDER_STATE.DRAFT, text: ORDER_STATE_LIST[ORDER_STATE.DRAFT] },
      { key: ORDER_STATE.SALES_APPROVE, value: ORDER_STATE.SALES_APPROVE, text: ORDER_STATE_LIST[ORDER_STATE.SALES_APPROVE] },
      { key: ORDER_STATE.BD_APPROVE, value: ORDER_STATE.BD_APPROVE, text: ORDER_STATE_LIST[ORDER_STATE.BD_APPROVE] },
      { key: ORDER_STATE.COMPLETED, value: ORDER_STATE.COMPLETED, text: ORDER_STATE_LIST[ORDER_STATE.COMPLETED] },
    ];

    return (
      <ThisContext.Provider value={{ self: this }}>
        <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
          <ListTitle />
          <ListBody>
            <ListRow>
              <TextField name='orderNumber' />
              <SelectionField name='orderState' options={stateList} />
            </ListRow>

            <ListRow>
              <DateField alt="fromDate" name="createdAt.$gte" />
              <DateField alt="toDate" name="createdAt.$lte" />
            </ListRow>
            <ListRow>
              <TextField name='customerName' />
            </ListRow>
            <ListActionList />
          </ListBody>
          <Footer />
          <ListSearchResult keyField="orderNumber" />
        </View >
      </ThisContext.Provider>
    );
  }
}


