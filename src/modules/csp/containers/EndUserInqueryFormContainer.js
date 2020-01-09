import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/formContainerHelper';
import { moduleConfig } from '../moduleConfig';
import EndUserInqueryForm from '../components/EndUserInqueryForm';
import { action } from '../actions/endUserInqueryAction';
import { model } from '../models/endUserInqueryModel';

function mapStateToProps(state) {
  const mapProps = getStateProps(state, moduleConfig.moduleCode, model.stateName);

  mapProps.afterObjectLoaded = (self, dataObject) => {
    const { refModels } = self.state;
    const orderRefModel = refModels.find(m => m.fieldName === 'orderList');
    orderRefModel.query.customerOracleCode = dataObject.customerOracleCode;
    orderRefModel.autoPageLoad = true;
  }
  return mapProps;
  // return getStateProps(state, moduleConfig.moduleCode, model.stateName);
}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(EndUserInqueryForm);
