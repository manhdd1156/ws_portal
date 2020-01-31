import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { moduleConfig } from '../moduleConfig';
import EndUserInqueryList from '../components/EndUserInqueryList';
import { action } from '../actions/endUserInqueryAction';
import { model } from '../models/endUserInqueryModel';

function mapStateToProps(state) {
  return getStateProps(state, moduleConfig.moduleCode, model.stateName);
}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(EndUserInqueryList);
