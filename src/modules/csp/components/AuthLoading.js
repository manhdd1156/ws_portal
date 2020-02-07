/*
 1/12/2019    FIT-ManhDD16     Created

*/
import React from 'react';
// import { connect } from 'react-redux';
// import configureStore from '../../../startup/configureStore';
import { checkAsyncStorage } from '../../../libs/commonHelper';
// import { loggedIn } from '../actions/authAction';
import { navigate } from '../../../libs/commonHelper';
import SigninContainer from '../containers/SigninContainer'

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userStorage = await checkAsyncStorage();
    await this.props.loggedIn({
      access_token: userStorage.token,
    });
    navigate(userStorage.token ? 'App' : 'Auth', {});
  };

  render() {
    return (
      <SigninContainer />
    );
  }
}
