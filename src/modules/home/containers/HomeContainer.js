import { connect } from "react-redux";
import Home from '../components/Home';
import { moduleConfig } from '../moduleConfig';
import { action } from '../actions/homeAction';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../../userControls/HeaderButton';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { model } from '../models/homeModel';

function mapStateToProps(state) {
  const {
    user,
    account,
    currentCompanyId, currentCompanyName,
    moduleList, currentModuleId,
    functionList,
    currentFunctionId,
    currentFunctionName,
    currentFunctionUrl,
    currentFunctionActionList,
  } = state.system;
  // console.log('state home2 : ', state.system)
  return {
    user,
    account,

    currentCompanyId,
    currentCompanyName,

    moduleList,
    currentModuleId,

    functionList,
    currentFunctionId,
    currentFunctionName,
    currentFunctionUrl,
    currentFunctionActionList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleReloginUserSuccess: ( // not use directly but by model component
      user,

      moduleList,
      currentModuleId,

      functionList,
      currentFunctionId,
      currentFunctionName,
      currentFunctionUrl,
      currentFunctionActionList,
    ) => dispatch(action.reloginUserSuccess(
      user,

      moduleList,
      currentModuleId,

      functionList,
      currentFunctionId,
      currentFunctionName,
      currentFunctionUrl,
      currentFunctionActionList,
    )),

    handleChangeCurrentFunction: functionId => dispatch(action.changeCurrentFunction(functionId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);