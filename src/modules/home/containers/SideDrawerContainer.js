import { connect } from "react-redux";
import SideDrawer from '../components/SideDrawer';
import { moduleConfig } from '../moduleConfig';
import { action } from '../actions/homeAction';
import { logout } from "../actions/authAction";
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { model } from '../models/signinModel';

function mapStateToProps(state) {
    // console.log('state : ', state.csp_signin.user)
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
        onLogout: () => dispatch(logout())
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
//         onLogout: () => dispatch(logout())
//     };
// };
export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);