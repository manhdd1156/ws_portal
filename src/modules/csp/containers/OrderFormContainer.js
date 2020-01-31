import { connect } from "react-redux";
import OrderForm from '../components/OrderForm';
import { moduleConfig } from '../moduleConfig';
import { getStateProps, getDispatchProps } from '../../../libs/formContainerHelper';
import { action } from '../actions/orderAction';
import { model } from '../models/orderModel';

function mapStateToProps(state) {
    // console.log('state, moduleConfig.moduleCode, model.stateName :', state, moduleConfig.moduleCode, model.stateName)
    return getStateProps(state, moduleConfig.moduleCode, model.stateName);
};

function mapDispatchToProps(dispatch) {
    return getDispatchProps(dispatch, action);
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);