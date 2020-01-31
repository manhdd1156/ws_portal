

/*
 18/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import { format } from 'date-and-time';
import { Card, CardItem, Body, CheckBox } from "native-base";
import { bindComponentToContext } from '../libs/componentHelper';
// import moment from 'moment';
import WrapText from './WrapText'
import { styles } from '../styles/listSearchResultStyle';
// import { SwipeRow } from 'react-native-swipe-list-view';
import { Colors, DATETIME_FORMAT, DATE_FORMAT, ITEM_AMOUNT_PER_PAGE } from '../constants/config';
import ListNavigator from './ListNavigator'
import ActiveField from './ActiveField'
import { containId, equalToId } from '../libs/commonHelper';
import { DATA_TYPE } from '../constants/dataType';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const renderFooter = (self) => {
  //it will show indicator at the bottom of the list when data is loading otherwise it returns null
  // console.log('render footer')
  if (!self.state.loading) return null;
  return (
    <ActivityIndicator size="large" color={Colors.primaryColor} />
  );
};

const objectListRenderSelector = createCachedSelector(
  self => self,
  (self, state) => state.objectId,
  (self, state) => state.objectList,
  (self, state) => state.selectedObjectList,
  (self, state) => state.query.fields,
  (self, state) => state.query.hiddenFields,
  (self, state, keyField) => keyField,
  (self, state, keyField, colorSelector) => colorSelector,

  (self, objectId, objectList, selectedObjectList, fields, hiddenFields, keyField, colorSelector) => {
    if (objectList && objectList.data) {
      const { onObjectClick, onSelectObject, onResetQuery, onCloseRow, onItemsPerPageChange } = self;
      const { offset } = objectList.query;
      const { model, loading, rowRef, showCheckbox, query } = self.state;
      const { modelName } = model;
      const { baseUrl } = self.props;
      const listKeyField = keyField.split(',');
      const itemsPerPage = query.itemsPerPage ? query.itemsPerPage : ITEM_AMOUNT_PER_PAGE;
      const totalAmount = objectList && objectList.length ? objectList.length : 0;



      const onRefresh = () => {
        const event = { preventDefault: () => { } };
        onResetQuery(event);
      }
      // const onObjectClick = (id) => {
      //   const event = { preventDefault: () => { } };
      //   onResetQuery(event);
      // }
      /* sử dụng cho swipeRow 
      // const closeRow = (id) => {
      //   onCloseRow(id)
      // }
      */

      const selectObject = (id) => {
        const data = { type: 'checkbox', name: id, checked: !containId(selectedObjectList, id) };
        onSelectObject(data)
      }
      const loadMoreData = () => {
        console.log('loadMoreData : ', itemsPerPage, totalAmount)
        if (itemsPerPage < totalAmount) {
          const data = { value: ITEM_AMOUNT_PER_PAGE * ((itemsPerPage / ITEM_AMOUNT_PER_PAGE) + 1) }; // value này là số lượng item sẽ được load trên màn hình 

          onItemsPerPageChange(data)
        }

      }


      if (_.isArray(fields)) {
        return (
          <FlatList
            keyExtractor={(item, index) => index}
            data={objectList.data}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            renderItem={(item) => (
              /* SWIPEROW START -- đây là layout hiển thị phần dưới của mỗi row. Hiện tại thì chưa có bussiness sử dụng phần này
              // <SwipeRow leftOpenValue={75} closeOnRowPress={true} onRowOpen={() => closeRow(item.item._id)} ref={ref => rowRef[item.item._id] = ref}>
              //   <View style={styles.rowBack}>
              //     <Touchable style={{ flex: 1 }} onPress={() => { self.confirmHandle(item.item._id); }} >
              //       <View style={{ width: 75, height: "100%", alignItems: 'center', justifyContent: 'center' }}>
              //         <Icon active ios='check' android="check" type="FontAwesome" fontSize={20} style={{ color: 'white' }} />
              //       </View>
              //     </Touchable>
              //   </View>
              SWIPEROW END  */

              <Translation key={`row.${item.index}`}>
                {(t, { i18n }) => (
                  <Card style={styles.cardView}>
                    <CardItem style={styles.cardHeaderView} header bordered button onPress={() => selectObject(item.item._id)}>
                      <View style={styles.checkboxView}>
                        <CheckBox checked={containId(selectedObjectList, item.item._id)} onPress={() => selectObject(item.item._id)} />
                      </View>
                      <View style={styles.textSerialView}>
                        <Text style={styles.textSerial}>{item.index + 1}</Text>
                      </View>
                    </CardItem>
                    <CardItem style={styles.cardBodyView} button onPress={() => onObjectClick(item.item._id)}>
                      <Body>
                        {
                          fields.map((field, cellIndex) => {
                            const fieldType = model[field] ? model[field].type : DATA_TYPE.STRING;
                            const translated = model[field] ? model[field].translated : false;
                            const value = item.item[field];
                            const cellKey = `tableCell.${field}.${cellIndex}`;
                            if (hiddenFields.findIndex(f => f === field) > -1) {
                              return (<View key={cellKey} />);
                            } else if (listKeyField.includes(field)) {
                              return (
                                <WrapText fillColor={_.isFunction(colorSelector) ? colorSelector(item.item) : true}>
                                  {i18n.exists(field) ? t(field) : field} : {value}
                                </WrapText>
                              )
                            } else if (field === 'active') {
                              return (
                                <View>
                                  <Text style={styles.text}>{i18n.exists(field) ? t(field) : field} : </Text>
                                  <ActiveField active={value} />
                                </View>
                              );
                            } else if (field === 'createdAt') {
                              return (
                                <WrapText>
                                  {i18n.exists(field) ? t(field) : field} : {value ? format(new Date(value), DATETIME_FORMAT) : ''}
                                </WrapText>);
                            }

                            switch (fieldType) {
                              case DATA_TYPE.STRING: {
                                if (translated) {
                                  return (
                                    <WrapText numberOflines={2}>
                                      {i18n.exists(field) ? t(field) : field} : {(`${field}.${value}` && i18n.exists(`${field}.${value}`)) ? t(`${field}.${value}`) : `${field}.${value}`}
                                    </WrapText>
                                  );
                                }
                                return (
                                  <WrapText numberOflines={2}>
                                    {i18n.exists(field) ? t(field) : field} : {value}
                                  </WrapText>
                                );
                              }

                              case DATA_TYPE.BOOLEAN:
                                return (
                                  <View>
                                    <Text style={styles.text}>{i18n.exists(field) ? t(field) : field} : </Text>
                                    <ActiveField active={value} />
                                  </View>

                                );

                              case DATA_TYPE.NUMBER:
                                return (
                                  <WrapText>
                                    {i18n.exists(field) ? t(field) : field} : {value}
                                  </WrapText>
                                );

                              case DATA_TYPE.DATE:
                                return (
                                  <WrapText>
                                    {i18n.exists(field) ? t(field) : field} : {value ? format(new Date(value), DATE_FORMAT) : ''}
                                  </WrapText>
                                );

                              case DATA_TYPE.DATE_TIME:
                                return (
                                  <WrapText>
                                    {i18n.exists(field) ? t(field) : field} : {value ? format(new Date(value), DATETIME_FORMAT) : ''}
                                  </WrapText>
                                );

                              default:
                                return (
                                  <WrapText>
                                    {i18n.exists(field) ? t(field) : field} : {value}
                                  </WrapText>
                                );
                            }
                          })
                        }
                      </Body>
                    </CardItem>
                  </Card>
                )}
              </Translation>
            )
            }
            ListFooterComponent={() => renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreData}
          />

        );
      }
    }

    return (<View />);
  },
)((self, state, keyField, colorSelector, cacheName) => cacheName);

const ThisContext = React.createContext({});

class ListSearchResult extends Component {
  static get propTypes() {
    return {
      keyField: PropTypes.string.isRequired,
      colorSelector: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
      ]),
    };
  }

  static get defaultProps() {
    return {
      colorSelector: '',
    };
  }

  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    bindComponentToContext(ListNavigator, ThisContext);

    const { keyField, colorSelector } = this.props;
    const { state } = self;
    const { query, model, showCheckbox, loading, objectList } = state;

    const { modelName } = model;
    const sortBy = query.sortBy ? query.sortBy.split('.') : [];
    const sortedField = sortBy[0] ? sortBy[0] : '';
    const sortDirection = sortBy[1] === 'desc' ? 'descending' : 'ascending';
    const totalAmount = objectList && objectList.length ? objectList.length : 0;

    return (
      <ThisContext.Provider value={{ self }}>
        <View style={{ flex: 1 }}>
          {loading && <ActivityIndicator size="large" style={styles.loading} color={Colors.primaryColor} />}
          <ListNavigator />
          <View style={styles.listView}>
            {objectListRenderSelector(self, self.state, keyField, colorSelector, `${modelName}.objectList`)}
          </View>
        </View>
      </ThisContext.Provider>
    );
  }
}

export default ListSearchResult;
