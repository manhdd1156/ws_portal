import { connect } from "react-redux";
import OrderList from '../components/OrderList';
import { moduleConfig } from '../moduleConfig';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { action } from '../actions/orderAction';
import { model } from '../models/orderModel';

function mapStateToProps(state) {
    
    // console.log('state, moduleConfig.moduleCode, model.stateName :', state, moduleConfig.moduleCode, model.stateName)
    return getStateProps(state, moduleConfig.moduleCode, model.stateName);
};

function mapDispatchToProps(dispatch) {
    return getDispatchProps(dispatch, action);
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);