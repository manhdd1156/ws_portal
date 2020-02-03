import { connect } from 'react-redux';
import { getStateProps, getDispatchProps } from '../../../libs/formContainerHelper';
import { moduleConfig } from '../moduleConfig';
import EndUserForm from '../components/EndUserForm';
import { action } from '../actions/endUserAction';
import { model } from '../models/endUserModel';

function mapStateToProps(state) {
  const mapProps = getStateProps(state, moduleConfig.moduleCode, model.stateName);

  mapProps.afterObjectLoaded = (self, dataObject) => {
    const { pageLoad, refModels } = self.state;

    const salesmanRefModel = refModels.find(m => m.fieldName === 'salesmanId');
    salesmanRefModel.query._id = dataObject.salesmanId;
    salesmanRefModel.query.limit = 10;
    salesmanRefModel.autoPageLoad = true;

    const { permissionList } = dataObject;

    if (_.isArray(permissionList)) {

      permissionList.forEach((line, index) => {
        const userList = {
          fieldName: 'permissionList.userId',
          refKeyField: '_id',
          relatedFields: ['userName', 'fullName'],

          data: [{
            _id: line.userId,
            userName: line.userName,
            fullName: line.fullName,
          }],
        };
        pageLoad[`permissionList.${index}.userId`] = userList;
      });
    }
  }
  return mapProps;

}

function mapDispatchToProps(dispatch) {
  return getDispatchProps(dispatch, action);
}

export default connect(mapStateToProps, mapDispatchToProps)(EndUserForm);
