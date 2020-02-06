/*
 31/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from 'react';
import { Trans, Translation } from 'react-i18next';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import { createDraft, finishDraft } from 'immer';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Platform,
    Dimensions
} from 'react-native';
import { Icon } from 'native-base'
import WrapText from '../../../userControls/WrapText'
import ModalRow from '../../../userControls/ModalRow'
import SelectionField from '../../../userControls/SelectionField'
import { bindComponentToContext } from '../../../libs/componentHelper';
import { Colors, moderateScale, verticalScale, scale } from '../../../constants/config';
import { getFieldAttribute } from '../../../libs/commonHelper';
import { PAY_TYPE, billingOptionsList } from '../constants/orderStateConstants';
import FormObjectDetailModal from '../../../userControls/FormObjectDetailModal';
import EmptyField from '../../../userControls/EmptyField';
import NumberField from '../../../userControls/NumberField';
import DefaultButton from '../../../userControls/DefaultButton';
import DateField from '../../../userControls/DateField';
import CustomeField from '../../../userControls/CustomeField'
import { styles } from '../styles/orderSelectorStyle'
import TextField from '../../../userControls/TextField';
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
const ThisContext = React.createContext({});

let publicProduct;
let publicLineKey;
let publicIndex;

export const orderListRenderSelector = createCachedSelector(
    self => self,
    (self, orderLineAll, ) => orderLineAll,
    (self, orderLineAll, productList) => productList,
    (self, orderLineAll, productList, periodList) => periodList,
    (self, orderLineAll, productList, periodList, handleStatus) => handleStatus,
    (self, orderLineAll, productList, periodList, handleStatus, modalVisible) => modalVisible,
    (self, orderLineAll, productList, periodList, handleStatus, modalVisible) => {
        if (productList) {

            const { onDeleteSubDocument, onProductSearchChange, billingOptionChange } = self;
            const changeIndex = (index) => {
                publicIndex = index;
            }
            if (orderLineAll && publicIndex === undefined) {
                publicIndex = 0;
            }

            if (publicIndex !== undefined) {
                publicProduct = orderLineAll[publicIndex];
                publicLineKey = `orderLineAll.${publicIndex}`;
            }
            const checkCondition = () => {
                if (publicProduct && publicLineKey)
                    return true
                return false
            }
            bindComponentToContext([FormObjectDetailModal, NumberField, DateField, CustomeField], ThisContext);
            return (
                <ThisContext.Provider value={{ self }}>
                    <Translation>
                        {
                            (t, { i18n }) => (
                                <ScrollView nestedScrollEnabled={true}>
                                    <FormObjectDetailModal>
                                        {checkCondition() ? (!handleStatus && checkCondition() ? <SelectionField alt={`productId`} name={`${publicLineKey}.productId`} options={productList} /> : <TextField alt={`productId`} name={`${publicLineKey}.productName`} readOnly={true} />) : null}
                                        {checkCondition() ? (<TextField alt={`offerId`} name={`${publicLineKey}.offerId`} readOnly={true} />) : null}
                                        {checkCondition() ? (!handleStatus && checkCondition() ? (publicProduct.payType === PAY_TYPE.BOTH ? <SelectionField alt={`billingOption`} name={`${publicLineKey}.billingOption`} options={billingOptionsList} ></SelectionField> : <EmptyField />) : <TextField alt={`billingOption`} name={`${publicLineKey}.billingOption`} readOnly={true} />) : null}
                                        {checkCondition() ? (!handleStatus && checkCondition() ? ((publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX) ? <NumberField style={{ maxWidth: 100 }} alt={`quantity`} name={`${publicLineKey}.quantity`} readOnly={handleStatus}></NumberField> : <EmptyField />) : (publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX ? <TextField alt={`quantity`} name={`${publicLineKey}.quantity`} label={false} readOnly={true} /> : <EmptyField />)) : null}
                                        {checkCondition() ? (!handleStatus ? (publicProduct.billingOption === PAY_TYPE.PAUG || publicProduct.payType === PAY_TYPE.PAUG ? <NumberField alt={`budget`} name={`${publicLineKey}.budget`} readOnly={handleStatus} ></NumberField> : <EmptyField />) : (publicProduct.billingOption === 'paug' || publicProduct.payType === 'paug' ? <TextField alt={`budget`} name={`${publicLineKey}.budget`} readOnly={true} /> : <EmptyField />)) : null}
                                        {checkCondition() ? (<NumberField alt={`suggestPrice`} name={`${publicLineKey}.suggestPrice`} readOnly={handleStatus} ></NumberField>) : null}
                                        {checkCondition() ? (<TextField alt={`uomName`} name={`${publicLineKey}.uomName`} readOnly={handleStatus} />) : null}
                                        {checkCondition() ? (!handleStatus ? (publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX ? <SelectionField alt={`periodName`} name={`${publicLineKey}.periodId`} options={periodList} /> : <EmptyField />) : (publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX ? <TextField alt={`periodName`} name={`${publicLineKey}.periodName`} readOnly={true} /> : <EmptyField />)) : null}
                                        {checkCondition() ? (publicProduct.periodDate ? <CustomeField alt={`planDate`} ><Text style={styles.customeTextField}>{publicProduct.periodDate}</Text></CustomeField> : <EmptyField />) : null}
                                        {checkCondition() ? (!handleStatus ? <DateField alt={`startDate`} name={`${publicLineKey}.startDate`} /> : <DateField alt={`startDate`} name={`${publicLineKey}.startDate`} readOnly />) : null}
                                        {checkCondition() ? (!handleStatus ? (publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX ? <DateField alt={`endDate`} name={`${publicLineKey}.endDate`} readOnly /> : <EmptyField />) : (publicProduct.billingOption === PAY_TYPE.FIX || publicProduct.payType === PAY_TYPE.FIX ? <DateField alt={`endDate`} name={`${publicLineKey}.endDate`} readOnly /> : <EmptyField />)) : null}

                                    </FormObjectDetailModal>
                                    {orderLineAll.map((product, index) => {
                                        const lineKey = `orderLineAll.${index}`;
                                        const { fieldType, fieldValue } = getFieldAttribute(self, `${lineKey}.productName`);
                                        const translated = fieldType ? fieldType.translated : false;
                                        return (
                                            <TouchableWithoutFeedback>
                                                <View style={[styles.rowView, { backgroundColor: index % 2 == 0 ? Colors.lightGrey : null }]}>

                                                    <View style={styles.rowFront}>
                                                        <Touchable onPress={() => { changeIndex(index); self.onModal(); }}>
                                                            <View style={{ width: '100%', justifyContent: 'center', paddingRight: 3, flex: 1, }}>
                                                                <ModalRow>
                                                                    <WrapText serial={index + 1} >
                                                                        {(translated && (i18n.exists(fieldValue))) ? t(fieldValue) : fieldValue}
                                                                    </WrapText>

                                                                </ModalRow>
                                                            </View>
                                                        </Touchable>
                                                    </View>
                                                    {!handleStatus ?
                                                        <View style={styles.rowBack}>
                                                            <DefaultButton
                                                                icon={<Icon ios='remove' android="remove" style={styles.icon} type="FontAwesome" />}
                                                                color={Colors.tertiaryColor}
                                                                buttonStyle={styles.buttonStyle}
                                                                onPress={() => onDeleteSubDocument(`${lineKey}`)}
                                                            />
                                                        </View>
                                                        : null}
                                                </View>
                                            </TouchableWithoutFeedback>)
                                    })}
                                </ScrollView>
                            )
                        }
                    </Translation>
                </ThisContext.Provider>
            )
        }
        return (
            <View></View>
        )
    })((self, orderLineAll, productList, periodList, handleStatus, modalVisible, cacheName) => cacheName);

export const convertMoney = (money) => {
    return (
        money.toFixed(0) // always two decimal digits
            .replace('.', ',') // replace decimal point character with ,
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ'
    )
}
export const getTotalPrice = createCachedSelector(
    (self) => self,
    (self, totalFix, totalBudget) => totalFix,
    (self, totalFix, totalBudget) => totalBudget,
    (self, totalFix, totalBudget) => {
        let total = 0;

        total = +totalFix + +totalBudget;

        const currentState = self.state;

        const changedFields = createDraft(self.state.object);
        changedFields['total'] = total;
        changedFields['totalBudget'] = totalBudget;
        changedFields['totalFix'] = totalFix;
        const newState = finishDraft(changedFields);

        // in form page
        self.setState({
            ...currentState,
            object: newState,
        });

        return total;
    },
)((self, totalFix, totalBudget, cacheName) => cacheName);


