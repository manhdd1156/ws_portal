/*
 14/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { bindComponentToContext } from '../../../libs/componentHelper';
import { initComponent, loadComponentData, onUpdate } from '../../../libs/listComponentHelper'; // [!] component LIST helper
import AdvancedSearchScreen from '../../../userControls/AdvancedSearchScreen'
import { ORDER_STATE, ORDER_STATE_LIST } from '../constants/orderStateConstants';
import TextField from "../../../userControls/TextField";
import ListSearchResult from "../../../userControls/ListSearchResult";
import DateField from "../../../userControls/DateField";
import ListActionList from "../../../userControls/ListActionList";
import ListModalRow from "../../../userControls/ListModalRow";
import SelectionField from "../../../userControls/SelectionField";
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
        AdvancedSearchScreen, ListActionList,
        ListModalRow, TextField, SelectionField, DateField, ListSearchResult
      ],
      ThisContext,
    );
    const stateList = [
      { key: ORDER_STATE.DRAFT, value: ORDER_STATE.DRAFT, text: ORDER_STATE_LIST[ORDER_STATE.DRAFT] },
      { key: ORDER_STATE.SALES_APPROVE, value: ORDER_STATE.SALES_APPROVE, text: ORDER_STATE_LIST[ORDER_STATE.SALES_APPROVE] },
      { key: ORDER_STATE.BD_APPROVE, value: ORDER_STATE.BD_APPROVE, text: ORDER_STATE_LIST[ORDER_STATE.BD_APPROVE] },
      { key: ORDER_STATE.COMPLETED, value: ORDER_STATE.COMPLETED, text: ORDER_STATE_LIST[ORDER_STATE.COMPLETED] },
    ];
    const lineList = [
      ['orderNumber', 'orderState'],
      ['customerName'],
      ['total', 'createdAt'],
    ];

    return (
      <ThisContext.Provider value={{ self: this }}>
        <View style={styles.container} pointerEvents={loading ? 'none' : 'auto'}>
          <AdvancedSearchScreen>

            <ListModalRow>
              <TextField name='orderNumber' layout='modal' />
              <SelectionField name='orderState' options={stateList} layout='modal' />
            </ListModalRow>

            <ListModalRow>
              <DateField alt="fromDate" name="createdAt.$gte" />
              <DateField alt="toDate" name="createdAt.$lte" />
            </ListModalRow>

          </AdvancedSearchScreen >
          <ListActionList />
          <ListSearchResult lines={lineList} keyField="orderNumber" />
        </View >
      </ThisContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
