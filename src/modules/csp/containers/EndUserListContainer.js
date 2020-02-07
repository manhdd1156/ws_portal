import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/listContainerHelper';
import { moduleConfig } from '../moduleConfig';
import EndUserList from '../components/EndUserList';
import { action } from '../actions/endUserAction';
import { model } from '../models/endUserModel';

function mapStateToProps(state) {
  //console.log('dddddd',state)
  return getStateProps(state, moduleConfig.moduleCode, model.stateName);
}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(EndUserList);
