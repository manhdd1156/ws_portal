import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { moduleConfig } from '../moduleConfig';
import ProductInqueryList from '../components/ProductInqueryList';
import { action } from '../actions/productInqueryAction';
import { model } from '../models/productInqueryModel';

function mapStateToProps(state) {
  
  return getStateProps(state, moduleConfig.moduleCode, model.stateName);
  
}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInqueryList);
