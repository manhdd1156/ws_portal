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
import LineInRow from '../../../userControls/LineInRow'
import SelectionField from '../../../userControls/SelectionField'
import { bindComponentToContext } from '../../../libs/componentHelper';
import { Colors, moderateScale, verticalScale, scale } from '../../../constants/config';
import { getFieldAttribute } from '../../../libs/commonHelper';
import { PAY_TYPE, billingOptionsList } from '../constants/orderStateConstants';
import FormObjectDetailModal from '../../../userControls/FormObjectDetailModal';
import EmptyField from '../../../userControls/EmptyField';
import NumberField from '../../../userControls/NumberField';
import DefaultButton from '../../../userControls/DefaultButton';
import ListModalRow from '../../../userControls/ListModalRow';
import TextField from '../../../userControls/TextField';
import CustomeField from '../../../userControls/CustomeField';
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
const ThisContext = React.createContext({});

let publicProduct;
let publicLineKey;
let publicIndex;

export const productListRenderSelector = createCachedSelector(
    self => self,
    (self, orderList, ) => orderList,
    (self, orderList, modalVisible) => modalVisible,
    (self, orderList, modalVisible) => {
        if (orderList && orderList.data) {

            const listOrder = [];
            const changeIndex = (index) => {
                publicIndex = index;
            }
            if (orderList && publicIndex === undefined) {
                publicIndex = 0;
            }


            const checkCondition = () => {
                if (publicProduct && publicLineKey)
                    return true
                return false
            }

            orderList.data.map((order) => {
                const { orderLineAll, orderNumber, orderState } = order;
                orderLineAll.map(line => {
                    listOrder.push({
                        orderNumber, orderState,
                        _id: line._id,
                        index: line.index,
                        productId: line.productId,
                        offerId: line.offerId,
                        productName: line.productName,
                        startDate: line.startDate,
                        quantity: line.quantity,
                    })
                })
            })
            if (publicIndex !== undefined) {
                publicProduct = listOrder[publicIndex];
                publicLineKey = `listOrder.${publicIndex}`;
            }
            bindComponentToContext([FormObjectDetailModal, CustomeField, NumberField], ThisContext);

            console.log('Tube  listOrder:', listOrder)
            console.log('Tube  listOrder[0]:', listOrder[0])
            return (
                <ThisContext.Provider value={{ self }}>
                    <Translation>
                        {
                            (t, { i18n }) => (
                                <ScrollView nestedScrollEnabled={true}>
                                    <FormObjectDetailModal>
                                        {checkCondition() ? <CustomeField alt={`offerId`}  ><Text>{publicProduct.offerId}</Text></CustomeField> : null}
                                        {checkCondition() ? <CustomeField alt={`productName`}  ><Text>{publicProduct.productName}</Text></CustomeField> : null}

                                        {checkCondition() ? <CustomeField alt={`startDate`}  ><Text>{publicProduct.startDate }</Text></CustomeField> : null}
                                        {checkCondition() ? <CustomeField alt={`quantity`}  ><Text>{publicProduct.quantity}</Text></CustomeField> : null}







                                    </FormObjectDetailModal>
                                    {listOrder.map((product, index) => {
                                        const { productName, offerId, startDate, orderState, quantity } = product;

                                        //const lineKey = 'listOrder.L${index}'
                                        // console.log('productName', product, `${product}.productName`)
                                        // console.log('kkkkkkk',self)
                                        const lineKey = `listOder.${index}`;
                                        //console.log ('linekey',lineKey)
                                        // const { fieldType, fieldValue } = getFieldAttribute(self, `${product}.productName`);
                                        // console.log('fieldType, fieldValue :', fieldType, fieldValue)
                                        // const translated = fieldType ? fieldType.translated : false;
                                        return (
                                            <TouchableWithoutFeedback>
                                                <View style={[styles.rowView, { backgroundColor: index % 2 == 0 ? Colors.lightGrey : null }]}>

                                                    <View style={styles.rowFront}>
                                                        <Touchable onPress={() => { changeIndex(index); self.onModal(); }}>
                                                            <View style={{ width: '100%', justifyContent: 'center', paddingRight: 3, flex: 1, }}>
                                                                <LineInRow>
                                                                    <WrapText serial={index + 1} >
                                                                        {productName}
                                                                    </WrapText>

                                                                </LineInRow>
                                                            </View>
                                                        </Touchable>
                                                    </View>
                                                    <View style={styles.rowBack}>
                                                        <DefaultButton
                                                            icon={<Icon ios='remove' android="remove" style={{ color: 'white', fontSize: 20 }} type="FontAwesome" />}
                                                            color={Colors.tertiaryColor}
                                                            buttonStyle={{ minWidth: 0, width: scale(30), padding: scale(2) }}
                                                            onPress={() => onDeleteSubDocument(`${lineKey}`)}
                                                        />
                                                    </View>
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
    })((self, orderList, modalVisible, cacheName) => cacheName);



    export const permissionListRenderSelector = createCachedSelector(
        self => self,
        (self, pageLoad, ) => pageLoad,
        (self, pageLoad, permissionList) => permissionList,
        (self, pageLoad, permissionList,modalVisible) => modalVisible,
        (self, pageLoad,permissionList ,modalVisible) => {
            if (permissionList) {
    
                const permissionList = [];
                const { onDeleteSubDocument } = self;
                const { onChangePermission } = self;
                const changeIndex = (index) => {
                    publicIndex = index;
                }
                if (permissionList && publicIndex === undefined) {
                    publicIndex = 0;
                }
    
    
                const checkCondition = () => {
                    if (publicPermission && publicLineKey)
                        return true
                    return false
                }
    
                
                if (publicIndex !== undefined) {
                    publicPermission = permissionList[publicIndex];
                    publicLineKey = `permissionList.${publicIndex}`;
                }
                bindComponentToContext([FormObjectDetailModal, CustomeField, NumberField], ThisContext);
    
                
                return (
                    <ThisContext.Provider value={{ self }}>
                        <Translation>
                            {
                                (t, { i18n }) => (
                                    <ScrollView nestedScrollEnabled={true}>
                                        <FormObjectDetailModal>
                                            

    
    
    
                                        </FormObjectDetailModal>
                                        {permissionList.map((permission, index) => {
                                            const lineKey = `permissionList.${index}`;

                                           // console.log('orderLineAll',orderLineAll[0].productName);
                                            
                                            const { fieldType, fieldValue } = getFieldAttribute(self, `${lineKey}.userID`);
                                            const translated = fieldType ? fieldType.translated : false;                 
                                            
                                            ;
                                            return (
                                                <TouchableWithoutFeedback>
                                                    <View style={[styles.rowView, { backgroundColor: index % 2 == 0 ? Colors.lightGrey : null }]}>
    
                                                        <View style={styles.rowFront}>
                                                            <Touchable onPress={() => { changeIndex(index); self.onModal(); }}>
                                                                <View style={{ width: '100%', justifyContent: 'center', paddingRight: 3, flex: 1, }}>
                                                                    <LineInRow>
                                                                        <WrapText serial={index + 1} >
                                                                        {(translated && (i18n.exists(fieldValue))) ? t(fieldValue) : fieldValue}
                                                                        </WrapText>
    
                                                                    </LineInRow>
                                                                </View>
                                                            </Touchable>
                                                        </View>
                                                        <View style={styles.rowBack}>
                                                            <DefaultButton
                                                                icon={<Icon ios='remove' android="remove" style={{ color: 'white', fontSize: 20 }} type="FontAwesome" />}
                                                                color={Colors.tertiaryColor}
                                                                buttonStyle={{ minWidth: 0, width: scale(30), padding: scale(2) }}
                                                                onPress={() => onDeleteSubDocument(`${lineKey}`)}
                                                            />
                                                        </View>
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
        })((self, orderList, modalVisible, cacheName) => cacheName);    

const styles = StyleSheet.create({
    eventView: {
        flex: 0.1,
        borderColor: 'red',
        borderWidth: 1,
    },
    listView: {
        flex: 1,
    },
    rowView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: scale(10)
    },
    rowFront: {
        height: 35,
        flex: 0.9,
    },
    rowBack: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.7,
        justifyContent: 'center',
        zIndex: 100,
    },
    checkBoxView: {
        justifyContent: 'center',
        width: '10%',
        paddingLeft: scale(1)
    },
    actionSearch: {
        paddingLeft: scale(12),
        color: Colors.grey,
        fontSize: moderateScale(28)
    }
});