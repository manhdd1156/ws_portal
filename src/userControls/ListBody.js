/*
 07/01/2020    FIT-ManhDD16     Created

*/
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropTypes from 'prop-types';
import createCachedSelector from 're-reselect';
import { Translation } from 'react-i18next';
import { Icon } from 'native-base';
import _ from 'lodash';
import { format } from 'date-and-time';
import { styles } from '../styles/listBodyStyle';
import { DATA_TYPE } from '../constants/dataType';
import { DATETIME_FORMAT, DATE_FORMAT } from '../constants/config';
import ActiveField from '../userControls/ActiveField';
import { QUERY_AUTO_ADDED_FIELD } from '../libs/listComponentHelper';
import { convertDataList2OptionList } from '../libs/commonHelper';
import { Colors, scale, moderateScale, widthCol } from '../constants/config'
import { bindComponentToContext } from '../libs/componentHelper';
import Tabs from '../userControls/Tabs'
import { Tab } from 'native-base'
import SelectionField from "./SelectionField";
import TextField from "./TextField";
import RadioField from "./RadioField";
import DefaultButton from "./DefaultButton"
import { OPERATOR_SIGN, OPERATOR_REPLACER } from '../libs/constants/mongoOperator';
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
                          name={''}
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
                          {isDefaultQuery ? <Icon active style={styles.toggleOnStyle} ios='toggle-on' android='toggle-on' type='FontAwesome' />
                            : <Icon active style={styles.toggleOffStyle} ios='toggle-off' android='toggle-off' type='FontAwesome' />
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
                      <DefaultButton color={Colors.primaryColor} buttonStyle={styles.saveQueryButtonStyle} onPress={onSaveQuery} title={t('system:tab.saveQuery')} />
                    </View>

                    <View key="Table" style={styles.tableView}>
                      <ScrollView horizontal>
                        <View>
                          <View key="Table.Header" style={styles.tableHeadView}>
                            <View key="Table.Row" style={styles.rowView}>
                              <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol }]}>
                                <Text>{t('system:table.order')}</Text>
                              </View>

                              <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 4 }]}>
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
                                  <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 4 }]}>
                                    <Text>{tpl.queryName}</Text>
                                  </View>
                                  <View key="Table.HeaderCell" style={[styles.tableCellView, { width: widthCol * 3 }]}>
                                    <ActiveField active={tpl.isDefaultQuery ? tpl.isDefaultQuery : false} />
                                  </View>
                                  <View key="Table.HeaderCell" style={[styles.tableCellView,styles.cellActionView, { width: widthCol * 2 }]}>
                                    <DefaultButton
                                      icon={<Icon ios='wrench' android="wrench" style={styles.wrenchIconStyle} type="FontAwesome5" />}
                                      color={Colors.primaryColor}
                                      buttonStyle={styles.wrenchButtonStyle}
                                      onPress={() => onSetQueryAsDefault(tpl._id, tpl.isDefaultQuery ? tpl.isDefaultQuery : false)}
                                    />
                                    <DefaultButton
                                      icon={<Icon ios='remove' android="remove" style={styles.removeIconStyle} type="FontAwesome" />}
                                      color={Colors.primaryColor}
                                      buttonStyle={styles.removeButtonStyle}
                                      onPress={() => onDeleteQuery(tpl._id)}
                                    />
                                  </View>

                                </View>
                              ))
                            }
                          </View>
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
export default ListBody;

