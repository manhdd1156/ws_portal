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
} from "react-native";
// import { Form, Tab, Menu, Container, Radio, Input, Button, Table, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import createCachedSelector from 're-reselect';
import { Trans, Translation } from 'react-i18next';
import { Icon } from 'native-base';
import _ from 'lodash';
import { format } from 'date-and-time';

// import { DATA_TYPE } from '../constants/dataType';
// import { DATETIME_FORMAT, DATE_FORMAT, PRIMARY_COLOR } from '../constants/config';
// import ActiveField from '../userControls/ActiveField';
import { QUERY_AUTO_ADDED_FIELD } from '../libs/listComponentHelper';
import { convertDataList2OptionList } from '../libs/commonHelper';
import { Colors, scale, moderateScale, verticalScale, } from '../constants/config'
import { bindComponentToContext } from '../libs/componentHelper';
import Tabs from '../userControls/Tabs'
import { Tab } from 'native-base'
import SelectionField from "./SelectionField";
import TextField from "./TextField";
import RadioField from "./RadioField";
import DefaultButton from "./DefaultButton"
// import { OPERATOR_SIGN, OPERATOR_REPLACER } from '../libs/constants/mongoOperator';
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
    bindComponentToContext([Tabs, Tab, SelectionField, TextField, RadioField], ThisContext);
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

                    <TouchableOpacity onPress={() => onValueRadioFieldChange("isDefaultQuery")}>
                      <View style={styles.radioView}>
                        {isDefaultQuery ? <Icon active style={{ fontSize: moderateScale(25), color: Colors.primaryColor }} ios='toggle-on' android='toggle-on' type='FontAwesome' />
                          : <Icon active style={{ fontSize: moderateScale(25), color: Colors.grey }} ios='toggle-off' android='toggle-off' type='FontAwesome' />
                        }
                        <View style={styles.labelView}><Text style={styles.label}>{t('system:tab.isDefaultQuery')}</Text></View>
                      </View>
                    </TouchableOpacity>


                    {/* <Table striped selectable compact celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell width={4} textAlign="center">
                          {t('system:table.fieldName')}
                        </Table.HeaderCell>
                        <Table.HeaderCell width={12} textAlign="center">
                          {t('system:table.fieldValue')}
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        Object.entries(query).map(([key, value]) => {
                          const fieldName = key.replace(OPERATOR_SIGN, OPERATOR_REPLACER);

                          if (value) {
                            const fieldType = model[key] ? model[key].type : DATA_TYPE.STRING;
                            let fieldValue = '';

                            switch (fieldType) {
                              case DATA_TYPE.ID:
                                if (value === '0') {
                                  return (<React.Fragment key={`query.${key}`} />);
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
                              <Table.Row key={`query.${key}`}>
                                <Table.Cell width={4} textAlign="center">
                                  {(i18n.exists(fieldName) ? t(fieldName) : fieldName)}
                                </Table.Cell>
                                <Table.Cell width={12} textAlign="left">
                                  {fieldValue}
                                </Table.Cell>
                              </Table.Row>
                            );
                          }

                          return null;
                        })
                      }
                    </Table.Body>
                  </Table> */}

                    <View>
                      <DefaultButton color={Colors.primaryColor} onPress={onSaveQuery} title={t('system:tab.saveQuery')} />
                    </View>

                    {/* <Table striped selectable compact celled color={PRIMARY_COLOR}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell width={1} textAlign="center">
                          {t('system:table.order')}
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                          {t('system:tab.queryName')}
                        </Table.HeaderCell>
                        <Table.HeaderCell width={3} textAlign="center">
                          {t('system:tab.isDefaultQuery')}
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2} textAlign="center" />
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        queryList.map((tpl, index) => (
                          <Table.Row key={tpl._id}>
                            <Table.Cell width={1} textAlign="center">{index + 1}</Table.Cell>
                            <Table.Cell textAlign="left">
                              {tpl.queryName}
                            </Table.Cell>
                            <Table.Cell width={3} textAlign="center">
                              <ActiveField active={tpl.isDefaultQuery ? tpl.isDefaultQuery : false} />
                            </Table.Cell>
                            <Table.Cell width={2} textAlign="center">
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  onSetQueryAsDefault(tpl._id, tpl.isDefaultQuery ? tpl.isDefaultQuery : false);
                                }}
                                type="button"
                                icon="configure"
                                color={PRIMARY_COLOR}
                                size="mini"
                              />

                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  onDeleteQuery(tpl._id);
                                }}
                                type="button"
                                icon="delete"
                                color={PRIMARY_COLOR}
                                size="mini"
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))
                      }
                    </Table.Body>
                  </Table> */}
                  </View>
                </Tab>
              </Tabs>
            )
          }
        </Translation>
      </ThisContext.Provider>
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
    borderColor: 'red',
    borderWidth: 1,
    justifyContent: 'flex-start'
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
  }
});
export default ListBody;

