/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
// import { Message, Container, Step } from 'semantic-ui-react';
// import NumberFormat from 'react-number-format';
import { createDraft, finishDraft } from 'immer';
import { Icon } from 'native-base';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Toast } from 'native-base'
import StepIndicator from 'react-native-step-indicator';
import { Translation } from 'react-i18next';
import { bindComponentToContext, listOptionsSelector } from '../../../libs/componentHelper';
import { initComponent, loadComponentData } from '../../../libs/formComponentHelper'; // [!] component FORM helper
import TextField from '../../../userControls/TextField';
import SelectionField from '../../../userControls/SelectionField';
import Footer from '../../../userControls/Footer';
import FormRow from '../../../userControls/FormRow';
import FormActionContainer from '../../../userControls/FormActionContainer';
import FormActionUpdate from '../../../userControls/FormActionUpdate';
import FormActionCreate from '../../../userControls/FormActionCreate';
import FormActionDelete from '../../../userControls/FormActionDelete';
import DefaultButton from '../../../userControls/DefaultButton'
import FormActionGoBack from '../../../userControls/FormActionGoBack';
import FormActionSend from '../../../userControls/FormActionSend';
import EmptyField from '../../../userControls/EmptyField';
import FormScrollArea from '../../../userControls/FormScrollArea';
import FormWorkFlow from '../../../userControls/FormWorkFlow';
import Loading from '../../../userControls/Loading'
import RadioField from '../../../userControls/RadioField';
import { Colors, scale } from '../../../constants/config';
import TextAreaField from '../../../userControls/TextAreaField';
// import { FormField, TextArea, Button } from 'semantic-ui-react';
import { ORDERSTATE, getCurrentPosition, ORDER_STATE, PAY_TYPE } from '../constants/orderStateConstants';
// import { getInputValue } from '../../../libs/commonHelper';
import { orderListRenderSelector, getTotalPrice, convertMoney } from '../selectors/orderSelector';
import { onSendWithoutCreate, onProductSearchChange } from '../functions/orderFunction';

const ThisContext = React.createContext({});

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    initComponent(this, props);
    this.onProductSearchChange = onProductSearchChange.bind(this);
    this.onSendWithoutCreate = onSendWithoutCreate.bind(this, this);
  }

  async componentDidMount() {
    await loadComponentData(this);
  }

  componentWillUnmount() {
    this.onGoBack();
  }


  render() {
    const { permmission } = this.props;
    const { object, pageLoad, loading, objectId, messages, modalVisible } = this.state;
    const { orderState, orderLineAll } = object;

    console.log('objectID : ' ,objectID)
    // const redirectInjection = this.onRedirect();
    // if (redirectInjection) { return redirectInjection; }
    let totalFix = 0;
    let totalBudget = 0;
    if (loading) return <Loading />
    if (orderLineAll != null) {
      orderLineAll.forEach(element => {
        if ((element.billingOption || element.payType) === PAY_TYPE.FIX) {
          if (element.quantity && element.suggestPrice) {
            totalFix += (+element.quantity) * (+element.suggestPrice);
          }
        } else if (element != null && (element.billingOption || element.payType) === PAY_TYPE.PAUG) {
          if (element.budget) {
            totalBudget += +element.budget;
          }
        }
      });
    }


    const productList = listOptionsSelector(pageLoad[`orderLineAll.productId`], '_id', 'oracleCode', 'productName', 'productList')
    const periodList = listOptionsSelector(pageLoad[`orderLineAll.periodId`], '_id', 'periodCode', 'periodName', 'periodList')
    const customerList = listOptionsSelector(pageLoad[`customerId`], '_id', 'customerOracleCode', 'customerName', 'customerList')
    const currentPosition = getCurrentPosition(orderState)
    let handleStatus = false;
    if (orderState !== ORDER_STATE.DRAFT) {
      handleStatus = true;

    }
    bindComponentToContext(
      [
        FormWorkFlow, FormRow, TextField, SelectionField, TextAreaField, Footer, FormActionContainer, FormActionCreate, FormActionUpdate,
        FormActionDelete, FormActionGoBack, FormActionSend, FormScrollArea
      ],
      ThisContext,
    );


    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={70} enabled>
        <ThisContext.Provider value={{ self: this }} >
          <ScrollView>
            <FormWorkFlow steps={ORDERSTATE} active={currentPosition} />

            <FormRow>
              <TextField name="orderNumber" readOnly={true} />
            </FormRow>

            <FormRow>
              {!handleStatus ? <SelectionField name="customerId" options={customerList} /> : <TextField name="customerName" readOnly />}
            </FormRow>

            <FormRow>
              <TextField name="departmentName" readOnly={handleStatus} />
              <TextField name="salesmanName" alt="salesmanId" readOnly={handleStatus} />
            </FormRow>

            <FormRow>
              <TextField name="paymentTerm" readOnly={handleStatus} />
              <EmptyField />
            </FormRow>

            <FormRow>
              <TextField name="billToName" readOnly={handleStatus} />
            </FormRow>

            <FormRow>
              <TextField name="shipToName" readOnly={handleStatus} />
            </FormRow>



            <FormScrollArea name='orderList'>
              {orderListRenderSelector(this, object.orderLineAll, productList, periodList, handleStatus, modalVisible, 'orderLineAll')}
            </FormScrollArea>

            {!handleStatus ? <DefaultButton icon={<Icon ios='plus' android="plus" style={{ color: 'white', fontSize: 20, }} type="FontAwesome" />} color={Colors.primaryColor} buttonStyle={{ padding: scale(2), minWidth: 0, width: scale(30) }} onPress={() => this.onAddSubDocument('orderLineAll')} /> : null}

            <View style={styles.customeView}>
              <Text>Tổng tiền mua theo gói:{convertMoney(totalFix)}</Text>
            </View>

            <View style={styles.customeView}>
              <Text>Tổng ngân sách:{convertMoney(totalBudget)}</Text>
            </View>

            <View style={styles.customeView}>
              <Text>Tổng tiền:{convertMoney(getTotalPrice(this, totalFix, totalBudget, 'totalPrice'))}</Text>
            </View>

            <FormRow>
              <TextAreaField name='note' readOnly={handleStatus} />
            </FormRow>
            <FormActionContainer >
              {(objectId === '0') && (<FormActionCreate />)}
              <Translation ns="system">
                {
                  t => ((permmission.canSend && objectId === '0') && (<DefaultButton color={Colors.primaryColor} onPress={this.onSendWithoutCreate} title={t('btn.send')} />))
                }
              </Translation>
              {(orderState === ORDER_STATE.DRAFT) && (<FormActionUpdate />)}
              {(orderState === ORDER_STATE.DRAFT || objectId === '0') && (<FormActionSend />)}
              {orderState === ORDER_STATE.DRAFT && (<FormActionDelete />)}
              <FormActionGoBack />
            </FormActionContainer>
            {/* {if(messages)} */}
            <Footer />
          </ScrollView>
        </ThisContext.Provider>
      </KeyboardAvoidingView>

    );
  }
}
const styles = StyleSheet.create({
  customeView: {
    paddingRight: scale(10),
    alignItems: 'flex-end',
  },
});