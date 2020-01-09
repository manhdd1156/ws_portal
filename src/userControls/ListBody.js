/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
// import { Form, Tab, Menu, Container, Radio, Input, Button, Table, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import createCachedSelector from 're-reselect';
import { Trans, Translation } from 'react-i18next';
import _ from 'lodash';
import { format } from 'date-and-time';

// import { DATA_TYPE } from '../constants/dataType';
// import { DATETIME_FORMAT, DATE_FORMAT, PRIMARY_COLOR } from '../constants/config';
// import ActiveField from '../userControls/ActiveField';
// import { QUERY_AUTO_ADDED_FIELD } from '../libs/listComponentHelper';
// import { convertDataList2OptionList } from '../libs/commonHelper';
// import { OPERATOR_SIGN, OPERATOR_REPLACER } from '../libs/constants/mongoOperator';

// export const listBodyPaneSelector = createCachedSelector(
//   self => self,
//   (self, state) => state.model,
//   (self, state) => _.omit(state.query, QUERY_AUTO_ADDED_FIELD), // remove auto-added fields
//   (self, state) => state.queryList || [],
//   (self, state) => state.query.queryName || '',
//   (self, state) => state.query.isDefaultQuery || false,
//   (self, state) => state.selectedQueryId,
//   (self, state, children) => children,

//   (self, model, query, queryList, queryName, isDefaultQuery, selectedQueryId, children) => {
//     const {
//       onChange, onRunAsQuery,
//       onSaveQuery, onSetQueryAsDefault, onDeleteQuery,
//     } = self;

//     const queryListOptions = convertDataList2OptionList(queryList, '_id', 'queryName', '');

//     return ([
//       {
//         menuItem: (
//           <Menu.Item key="tabSearch">
//             <Trans i18nKey="system:tab.search" />
//           </Menu.Item>
//         ),
//         pane: (
//           <Tab.Pane key="departmentList">
//             <Translation>
//               {
//                 t => (
//                   <React.Fragment>
//                     {
//                       queryList && queryList.length ? (
//                         <Form.Group widths="equal">
//                           <Form.Field
//                             value={selectedQueryId}
//                             options={queryListOptions}
//                             label={t('system:tab.savedQueryName')}
//                             onChange={onRunAsQuery}

//                             control={Select}
//                             fluid
//                           />
//                           <Form.Field />
//                         </Form.Group>
//                       ) : (
//                         <React.Fragment />
//                       )
//                     }

//                     { children }
//                   </React.Fragment>)
//                 }
//             </Translation>
//           </Tab.Pane>
//         ),
//       },

//       {
//         menuItem: (
//           <Menu.Item key="tabUtility">
//             <Trans i18nKey="system:tab.utility" />
//           </Menu.Item>
//         ),

//         pane: (
//           <Tab.Pane key="userList">
//             <Translation>
//               {
//               (t, { i18n }) => (
//                 <React.Fragment>
//                   <Form.Field
//                     name="queryName"
//                     value={queryName}
//                     control={Input}
//                     onChange={onChange}
//                     label={t('system:tab.queryName')}
//                     required
//                   />

//                   <Form.Field
//                     name="isDefaultQuery"
//                     checked={isDefaultQuery}
//                     control={Radio}
//                     onChange={onChange}
//                     toggle
//                     color="blue"
//                     label={t('system:tab.isDefaultQuery')}
//                   />

//                   <Table striped selectable compact celled>
//                     <Table.Header>
//                       <Table.Row>
//                         <Table.HeaderCell width={4} textAlign="center">
//                           { t('system:table.fieldName') }
//                         </Table.HeaderCell>
//                         <Table.HeaderCell width={12} textAlign="center">
//                           { t('system:table.fieldValue') }
//                         </Table.HeaderCell>
//                       </Table.Row>
//                     </Table.Header>

//                     <Table.Body>
//                       {
//                         Object.entries(query).map(([key, value]) => {
//                           const fieldName = key.replace(OPERATOR_SIGN, OPERATOR_REPLACER);

//                           if (value) {
//                             const fieldType = model[key] ? model[key].type : DATA_TYPE.STRING;
//                             let fieldValue = '';

//                             switch (fieldType) {
//                               case DATA_TYPE.ID:
//                                 if (value === '0') {
//                                   return (<React.Fragment key={`query.${key}`} />);
//                                 }
//                                 fieldValue = value;
//                                 break;

//                               case DATA_TYPE.ARRAY:
//                                 fieldValue = value.join(', ');
//                                 break;

//                               case DATA_TYPE.OBJECT:
//                                 fieldValue = JSON.stringify(value);
//                                 break;

//                               case DATA_TYPE.DATE:
//                                 fieldValue = value ? format(new Date(value), DATE_FORMAT) : '';
//                                 break;

//                               case DATA_TYPE.DATE_TIME:
//                                 fieldValue = value ? format(new Date(value), DATETIME_FORMAT) : '';
//                                 break;

//                               default:
//                                 fieldValue = value.toString();
//                                 break;
//                             }

//                             return (
//                               <Table.Row key={`query.${key}`}>
//                                 <Table.Cell width={4} textAlign="center">
//                                   { (i18n.exists(fieldName) ? t(fieldName) : fieldName) }
//                                 </Table.Cell>
//                                 <Table.Cell width={12} textAlign="left">
//                                   { fieldValue }
//                                 </Table.Cell>
//                               </Table.Row>
//                             );
//                           }

//                           return null;
//                         })
//                     }
//                     </Table.Body>
//                   </Table>

//                   <Container textAlign="center">
//                     <Button type="button" color={PRIMARY_COLOR} onClick={onSaveQuery} >
//                       { t('system:tab.saveQuery') }
//                     </Button>
//                   </Container>

//                   <Table striped selectable compact celled color={PRIMARY_COLOR}>
//                     <Table.Header>
//                       <Table.Row>
//                         <Table.HeaderCell width={1} textAlign="center">
//                           { t('system:table.order') }
//                         </Table.HeaderCell>
//                         <Table.HeaderCell textAlign="center">
//                           { t('system:tab.queryName') }
//                         </Table.HeaderCell>
//                         <Table.HeaderCell width={3} textAlign="center">
//                           { t('system:tab.isDefaultQuery') }
//                         </Table.HeaderCell>
//                         <Table.HeaderCell width={2} textAlign="center" />
//                       </Table.Row>
//                     </Table.Header>

//                     <Table.Body>
//                       {
//                       queryList.map((tpl, index) => (
//                         <Table.Row key={tpl._id}>
//                           <Table.Cell width={1} textAlign="center">{index + 1}</Table.Cell>
//                           <Table.Cell textAlign="left">
//                             { tpl.queryName }
//                           </Table.Cell>
//                           <Table.Cell width={3} textAlign="center">
//                             <ActiveField active={tpl.isDefaultQuery ? tpl.isDefaultQuery : false} />
//                           </Table.Cell>
//                           <Table.Cell width={2} textAlign="center">
//                             <Button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 onSetQueryAsDefault(tpl._id, tpl.isDefaultQuery ? tpl.isDefaultQuery : false);
//                               }}
//                               type="button"
//                               icon="configure"
//                               color={PRIMARY_COLOR}
//                               size="mini"
//                             />

//                             <Button
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 onDeleteQuery(tpl._id);
//                               }}
//                               type="button"
//                               icon="delete"
//                               color={PRIMARY_COLOR}
//                               size="mini"
//                             />
//                           </Table.Cell>
//                         </Table.Row>
//                       ))
//                     }
//                     </Table.Body>
//                   </Table>
//                 </React.Fragment>
//               )
//             }
//             </Translation>
//           </Tab.Pane>
//         ),
//       },
//     ]);
//   },
// )((self, state, children, cacheName) => cacheName);

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
    console.log('chidren :', children)
    return (
      <View>
        {this.props.children}
      </View>
      // <Form className="attached fluid segment">
      //   <Tab panes={listBodyPaneSelector(self, state, children, `ListBody.${model.modelName}`)} renderActiveOnly={false} />
      // </Form>
    );
  }
}

export default ListBody;

