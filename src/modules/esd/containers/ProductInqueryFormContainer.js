import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/formContainerHelper';
import { moduleConfig } from '../moduleConfig';
import ProductInqueryForm from '../components/ProductInqueryForm';
import { action } from '../actions/productInqueryAction';
import { model } from '../models/productInqueryModel';

function mapStateToProps(state) {
  return getStateProps(state, moduleConfig.moduleCode, model.stateName);
}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInqueryForm);
