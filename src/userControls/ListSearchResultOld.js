

/*
 18/12/2019    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SectionList,
  FlatList,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
} from "react-native";
import PropTypes from 'prop-types';
// import { Table, Checkbox, Icon } from 'semantic-ui-react';
import { Translation } from 'react-i18next';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import { format } from 'date-and-time';
import { Icon, CheckBox, Spinner } from 'native-base';
import { bindComponentToContext } from '../libs/componentHelper';
import moment from 'moment';
import WrapText from './WrapText'
import { SwipeRow } from 'react-native-swipe-list-view';
import { scale, moderateScale, verticalScale, Colors, DATETIME_FORMAT, DATE_FORMAT, ITEM_AMOUNT_PER_PAGE } from '../constants/config';
import { } from '../constants/config';
import ModalRow from './ModalRow'
import ListNavigator from './ListNavigator'
import ActiveField from './ActiveField'
import Loading from './Loading'
// import NumberValue from './NumberValue';
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
  (self, state, keyField, lines) => lines,

  (self, objectId, objectList, selectedObjectList, fields, hiddenFields, keyField, lines) => {
    if (objectList && objectList.data && lines) {
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


      if (_.isArray(fields) && _.isArray(lines)) {
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
              <View style={styles.rowFront}>
                {showCheckbox ? <TouchableOpacity style={styles.checkBoxView} onPress={() => selectObject(item.item._id)}>
                  <CheckBox checked={containId(selectedObjectList, item.item._id)} onPress={() => selectObject(item.item._id)} />
                </TouchableOpacity>
                  :
                  null
                }
                <Touchable onPress={() =>
                  onObjectClick(item.item._id)
                }
                  onLongPress={() => { if (!showCheckbox) self.setState({ showCheckbox: true }); console.log('longssss press :', showCheckbox) }}
                >
                  <View style={{ width: '100%', justifyContent: 'center', paddingRight: 3 }}>
                    {lines.map((line, lineIndex) => {
                      const customeStyle = lineIndex != 0 ? { color: Colors.grey, fontSize: moderateScale(14), } : {}
                      return (
                        <Translation key={`row.${lineIndex}`}>
                          {(t, { i18n }) => (
                            <ModalRow>
                              {line.map((element, elementIndex) => {
                                const fieldType = model[element] ? model[element].type : DATA_TYPE.STRING;
                                const translated = model[element] ? model[element].translated : false;
                                const value = item.item[element];
                                if (lineIndex == 0 && elementIndex == 0) { // nếu là phần tử đầu tiên ở line 1 thì sẽ thêm stt lên trước nó,
                                  return (
                                    <WrapText serial={item.index + 1} >
                                      {value}
                                    </WrapText>
                                  );
                                }
                                else if (hiddenFields.findIndex(f => f === element) > -1) {
                                  return (<View />);
                                } else if (listKeyField.includes(element)) {
                                  return (
                                    <WrapText fillColor={true} propStyles={customeStyle}>
                                      {value}
                                    </WrapText>
                                  );
                                } else if (element === 'active') {
                                  return (
                                    <ActiveField active={value} />
                                  );
                                } else if (element === 'createdAt') {
                                  return (
                                    <WrapText fillColor={true} propStyles={customeStyle}>
                                      {value ? format(new Date(value), DATETIME_FORMAT) : ''}
                                    </WrapText>
                                  );
                                }
                                switch (fieldType) {
                                  case DATA_TYPE.STRING: {
                                    if (translated) {
                                      return (
                                        <WrapText propStyles={customeStyle}>
                                          {(`${element}.${value}` && i18n.exists(`${element}.${value}`)) ? t(`${element}.${value}`) : `${element}.${value}`}
                                        </WrapText>
                                      );
                                    }
                                    return (
                                      <WrapText propStyles={customeStyle}>
                                        {value}
                                      </WrapText>
                                    );
                                  }
                                  case DATA_TYPE.BOOLEAN:
                                    return (
                                      <ActiveField active={value} />
                                    );
                                  case DATA_TYPE.NUMBER:
                                    return (
                                      <WrapText propStyles={customeStyle}>
                                        {value}
                                      </WrapText>
                                    );
                                  case DATA_TYPE.DATE:
                                    return (
                                      <WrapText fillColor={true} propStyles={customeStyle}>
                                        {value ? format(new Date(value), DATE_FORMAT) : ''}
                                      </WrapText>
                                    );
                                  case DATA_TYPE.DATE_TIME:
                                    return (

                                      <WrapText fillColor={true} propStyles={customeStyle}>
                                        {value ? format(new Date(value), DATETIME_FORMAT) : ''}
                                      </WrapText>
                                    );
                                  default:
                                    return (
                                      <WrapText propStyles={customeStyle}>
                                        {value}
                                      </WrapText>
                                    );
                                }
                              })}
                            </ModalRow>
                          )}
                        </Translation>
                      )
                    })}

                  </View>
                </Touchable>
              </View>
              // </SwipeRow >

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
      lines: PropTypes.array.isRequired,
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

    const { keyField, colorSelector, lines } = this.props;
    const { state } = self;
    const { query, model, showCheckbox, loading } = state;

    const { modelName } = model;
    const sortBy = query.sortBy ? query.sortBy.split('.') : [];
    const sortedField = sortBy[0] ? sortBy[0] : '';
    const sortDirection = sortBy[1] === 'desc' ? 'descending' : 'ascending';
    return (
      <ThisContext.Provider value={{ self }}>
        <View style={{ flex: 1 }}>
          {loading && <ActivityIndicator size="large" style={styles.loading} color={Colors.primaryColor} />}
          {showCheckbox ? <ListNavigator /> : null}
          <View style={styles.listView}>
            {objectListRenderSelector(self, self.state, keyField, lines, `${modelName}.objectList`)}
          </View>
        </View>
      </ThisContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  eventView: {
    flex: 0.1,
    borderColor: 'red',
    borderWidth: 1,
  },
  listView: {
    flex: 1,
  },
  rowFront: {
    backgroundColor: 'white',
    paddingBottom: verticalScale(5),
    flexDirection: 'row',
    flex: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
export default ListSearchResult;
