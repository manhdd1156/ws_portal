import { connect } from "react-redux";
import Signin from '../components/Signin';
import { moduleConfig } from '../moduleConfig';
import { clearLoginErrorMessage, login } from '../actions/authAction';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { model } from '../models/signinModel';

const mapStateToProps = state => {
  return state.signin
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData) => dispatch(login(authData)),
    clearLoginErrorMessage: () => dispatch(clearLoginErrorMessage()),
    // onTryAuth: (authData) => dispatch(tryAuth(authData)),
    // onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);