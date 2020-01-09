/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import { bindComponentToContext } from '../libs/componentHelper';
import FormActionContainer from './FormActionContainer';
import FormActionCreate from './FormActionCreate';
import FormActionUpdate from './FormActionUpdate';
import FormActionDelete from './FormActionDelete';
import FormActionGoBack from './FormActionGoBack';

const ThisContext = React.createContext({});

class FormActionList extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    bindComponentToContext([
      FormActionContainer, FormActionCreate, FormActionUpdate,
      FormActionDelete, FormActionGoBack,
    ], ThisContext);

    return (
      <ThisContext.Provider value={{ self }}>
        <FormActionContainer>
          <FormActionCreate />
          <FormActionUpdate />
          <FormActionDelete />
          <FormActionGoBack />
        </FormActionContainer>
      </ThisContext.Provider>);
  }
}

export default FormActionList;
