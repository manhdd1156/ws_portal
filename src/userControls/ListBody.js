/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
// import { Form, Tab, Menu, Container, Radio, Input, Button, Table, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import createCachedSelector from 're-reselect';
import { Trans, Translation } from 'react-i18next';
import { Icon, Container } from 'native-base';
import _ from 'lodash';
import { format } from 'date-and-time';

import { DATA_TYPE } from '../constants/dataType';
import { DATETIME_FORMAT, DATE_FORMAT } from '../constants/config';
import ActiveField from '../userControls/ActiveField';
import { QUERY_AUTO_ADDED_FIELD } from '../libs/listComponentHelper';
import { convertDataList2OptionList } from '../libs/commonHelper';
import { Colors, scale, moderateScale, verticalScale, widthCol } from '../constants/config'
import { bindComponentToContext } from '../libs/componentHelper';
import Tabs from '../userControls/Tabs'
import { Tab } from 'native-base'
import SelectionField from "./SelectionField";
import TextField from "./TextField";
import RadioField from "./RadioField";
import DefaultButton from "./DefaultButton"
import { OPERATOR_SIGN, OPERATOR_REPLACER } from '../libs/constants/mongoOperator';
import { Table, Row, Rows } from 'react-native-table-component';
const ThisContext = React.createContext({});
export const listBodyPaneSelector = createCachedSelector(
  self => self,
  (self, state) => state.model,
  (self, state) => _.omit(state.query, QUERY_AUTO_ADDED_FIELD), // remove auto-added fields
  (self, state) => state.queryList || [],
  (self, state) => state.query.queryName || '',
  (self, state) => state.query.isDefaultQuery || false,
  (self, state) => state.selectedQueryId,
  (self, state, children) => children,

  (self, model, query, queryList, queryName, isDefaultQuery, selectedQueryId, children) => {
    const {
      onChange, onRunAsQuery,
      onSaveQuery, onSetQueryAsDefault, onDeleteQuery,
    } = self;
    const queryListOptions = convertDataList2OptionList(queryList, '_id', 'queryName', '');
    const onValueTextFieldChange = (name, text) => {
      const data = { type: 'input.textField', name, value: text };
      onChange(data);
    }
    const onValueRadioFieldChange = (name) => {
      const data = { type: 'radio', name, checked: !isDefaultQuery, };
      onChange(data);
    }
    bindComponentToContext([Tabs, Tab, ActiveField, SelectionField, TextField, RadioField], ThisContext);
    return (
      <ThisContext.Provider value={{ self }}>
        <Translation>
          {
            (t, { i18n }) => (
              <Tabs >
                <Tab heading={t("system:tab.search")}>

                  <View>
                    {
                      queryList && queryList.length ? (
                        <SelectionField
                          value={selectedQueryId}
                          options={queryListOptions}
                          label={t('system:tab.savedQueryName')}
                          onChange={onRunAsQuery}
                        />
                      ) : (
                          <View />
                        )
                    }

                    {children}
                  </View>
                </Tab>
                <Tab heading={t("system:tab.utility")}>

                  <View>
                    <View style={styles.textFieldView}>
                      <View style={styles.labelView}><Text style={styles.label}>{t('system:tab.queryName')}<Text style={styles.required}>{'*'}</Text></Text></View>
                      <TextInput
                        underlineColorAndroid="transparent"
                        value={queryName}
                        onChangeText={(text) => onValueTextFieldChange("queryName", text)}    // nếu là onChange thì giá trị trả về là {  nativeEvent: { eventCount, target, text} }
                        style={styles.textInput}
                      />
                    </View>


                    <View style={styles.radioView}>
                      <TouchableOpacity onPress={() => onValueRadioFieldChange("isDefaultQuery")}>
                        <View style={{ flexDirection: 'row' }}>
                          {isDefaultQuery ? <Icon active style={{ fontSize: moderateScale(25), color: Colors.primaryColor }} ios='toggle-on' android='toggle-on' type='FontAwesome' />
                            : <Icon active style={{ fontSize: moderateScale(25), color: Colors.grey }} ios='toggle-off' android='toggle-off' type='FontAwesome' />
                          }
                          <View style={styles.labelView}><Text style={styles.label}>{t('system:tab.isDefaultQuery')}</Text></View>
                        </View>
                      </TouchableOpacity>
                    </View>


                    <View key="Table" style={styles.tableView}>
                      <View key="Table.Header" style={styles.tableHeadView}>
                        <View key="Table.Row" style={styles.rowView}>
                          <View key="Table.HeaderCell" style={[styles.tableCellView, { flex: 4 }]}>
                            <Text>{t('system:table.fieldName')}</Text>
                          </View>
                          <View key="Table.HeaderCell" style={[styles.tableCellView, { flex: 10 }]}>
                            <Text>{t('system:table.fieldValue')}</Text>
                          </View>
                        </View>
                      </View>

                      <View key="Table.Body" style={{}}>

                        {
                          Object.entries(query).map(([key, value]) => {
                            const fieldName = key.replace(OPERATOR_SIGN, OPERATOR_REPLACER);

                            if (value) {
                              const fieldType = model[key] ? model[key].type : DATA_TYPE.STRING;
                              let fieldValue = '';

                              switch (fieldType) {
                                case DATA_TYPE.ID:
                                  if (value === '0') {
                                    return (<View key={`query.${key}`} />);
                                  }
                                  fieldValue = value;
                                  break;

                                case DATA_TYPE.ARRAY:
                                  fieldValue = value.join(', ');
                                  break;

                                case DATA_TYPE.OBJECT:
                                  fieldValue = JSON.stringify(value);
                                  break;

                                case DATA_TYPE.DATE:
                                  fieldValue = value ? format(new Date(value), DATE_FORMAT) : '';
                                  break;

                                case DATA_TYPE.DATE_TIME:
                                  fieldValue = value ? format(new Date(value), DATETIME_FORMAT) : '';
                                  break;

                                default:
                                  fieldValue = value.toString();
                                  break;
                              }

                              return (
                                <View key="Table.Row" style={styles.rowView}>
                                  <View key="Table.HeaderCell" style={[styles.tableCellView, { flex: 4 }]}>
                                    <Text>{(i18n.exists(fieldName) ? t(fieldName) : fieldName)}</Text>
                                  </View>
                                  <View key="Table.HeaderCell" style={[styles.tableCellView, { flex: 10 }]}>
                                    <Text>{fieldValue}</Text>
                                  </View>
                                </View>
                              );
                            }

                            return null;
                          })
                        }
                      </View>
                    </View>

                    <View style={{ alignItems: 'center', padding: scale(5) }}>
                      <DefaultButton color={Colors.primaryColor} buttonStyle={{ width: widthCol * 2.5 }} onPress={onSaveQuery} title={t('system:tab.saveQuery')} />
                    </View>

                    <View key="Table" style={styles.tableView}>
                      <ScrollView horizontal>
                        <View key="Table.Header" style={styles.tableHeadView}>
                          <View key="Table.Row" style={styles.rowView}>
                            <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol }]}>
                              <Text>{t('system:table.order')}</Text>
                            </View>

                            <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 5 }]}>
                              <Text>{t('system:tab.queryName')}</Text>
                            </View>

                            <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 3 }]}>
                              <Text>{t('system:tab.isDefaultQuery')}</Text>
                            </View>
                            <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 2 }]} />

                          </View>
                        </View>

                        <View key="Table.Body" style={{}}>
                          {
                            queryList.map((tpl, index) => (
                              <View key="Table.Row" style={styles.rowView}>
                                <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol }]}>
                                  <Text>{index + 1}</Text>
                                </View>
                                <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 5 }]}>
                                  <Text>{tpl.queryName}</Text>
                                </View>
                                <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 3 }]}>
                                  <ActiveField active={tpl.isDefaultQuery ? tpl.isDefaultQuery : false} />
                                </View>
                                <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 2 }]}>
                                  <DefaultButton
                                    icon={<Icon ios='wrench' android="wrench" style={{ color: 'white', fontSize: 20 }} type="FontAwesome5" />}
                                    color={Colors.primaryColor}
                                    buttonStyle={{ minWidth: 0, width: scale(30), padding: scale(2) }}
                                    onPress={() => onSetQueryAsDefault(tpl._id, tpl.isDefaultQuery ? tpl.isDefaultQuery : false)}
                                  />
                                  <DefaultButton
                                    icon={<Icon ios='remove' android="remove" style={{ color: 'white', fontSize: 20 }} type="FontAwesome" />}
                                    color={Colors.primaryColor}
                                    buttonStyle={{ minWidth: 0, width: scale(30), padding: scale(2) }}
                                    onPress={() => onDeleteQuery(tpl._id)}
                                  />
                                </View>

                              </View>
                            ))
                          }
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </Tab>
              </Tabs>
            )
          }
        </Translation >
      </ThisContext.Provider >
    );
  },
)((self, state, children, cacheName) => cacheName);

class ListBody extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
      ]).isRequired,
    };
  }

  render() {
    const self = this.props.self ? this.props.self : this.context.self;
    if (!self || !self.state) return (<React.Fragment />);

    const { children } = this.props;
    const { state } = self;
    const { model } = state;
    return (
      <View style={{ zIndex: 9, flex: 0.4, }}>
        {listBodyPaneSelector(self, state, children, `ListBody.${model.modelName}`)}
      </View>
      // <Form className="attached fluid segment">
      //   <Tab panes={listBodyPaneSelector(self, state, children, `ListBody.${model.modelName}`)} renderActiveOnly={false} />
      // </Form>
    );
  }
}
const styles = StyleSheet.create({
  tabsView: {
    height: verticalScale(30)
  },
  textFieldView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  labelView: {
    justifyContent: 'flex-start',
  },
  required: {
    color: 'red',
  },
  label: {
    color: 'black',
    fontSize: moderateScale(16)
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    height: verticalScale(35),
    borderColor: Colors.black,
    borderRadius: scale(4),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(5),
    marginTop: verticalScale(6),
    marginBottom: verticalScale(6),
  },
  radioView: {
    paddingTop: verticalScale(6),
    paddingBottom: verticalScale(6),
    paddingLeft: scale(5),
    flexDirection: 'row',
    alignItems: 'center'
  },
  tableView: {
    padding: scale(5)
  },
  tableHeadView: {
    backgroundColor: '#E3E4E5',
  },
  rowView: {
    flexDirection: 'row',
    borderRightColor: Colors.grey,
    borderRightWidth: 1,
  },
  tableCellView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  text: {
    margin: 6,
    color: Colors.black
  }
});
export default ListBody;

