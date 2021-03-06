/*
 22/12/2019    FIT-ManhDD16     Created

*/
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import { bindComponentToContext } from '../libs/componentHelper';
import ListActionContainer from './ListActionContainer';
import ListActionSearch from './ListActionSearch';
import ListActionSearchAll from './ListActionSearchAll';
// import ListActionExport from './ListActionExport';
import ListActionCreate from './ListActionCreate';

const ThisContext = React.createContext({});

export default class ListActionList extends Component {
  render() {
    const { self } = this.context;
    if (!self || !self.state) return (<React.Fragment />);

    bindComponentToContext(
      [
        ListActionSearch,
        ListActionSearchAll,
        // ListActionExport,
        ListActionCreate,
      ],

      ThisContext,
    );

    return (
      <ThisContext.Provider value={{ self }}>
        <ListActionContainer>
          <ListActionSearch />
          <ListActionSearchAll />
          {/* <ListActionExport /> */}
          <ListActionCreate />
        </ListActionContainer>
      </ThisContext.Provider>
    );
  }
}
