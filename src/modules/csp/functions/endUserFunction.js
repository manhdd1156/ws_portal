import { bindComponentToContext, listOptionsSelector, LOADING_STATE } from '../../../libs/componentHelper';
import { getRequestHeader, apiGetById, apiUpload, apiPost, apiGetList } from '../../../libs/apiHelper';
import { getInputValue } from '../../../libs/commonHelper';
import { createDraft, finishDraft } from 'immer';


export const onUserSearchChange = async (self, e, searchQuery, cacheKey) => {
  e.persist();
  self.setState(LOADING_STATE);

  const pageLoad = { ...self.state.pageLoad }; // change pageLoad to rebuild selector cache
  const { refModels } = self.state;
  const model = refModels.find(f => f.modelName === 'v2/users');
  const { query } = model;

  const listResult = {
    fieldName: model.fieldName,
    refKeyField: model.refKeyField,
    relatedFields: model.relatedFields,
  };

  query.limit = 10;

  if (searchQuery) {
    query.userName = searchQuery;
  }

  const { error, data } = await apiGetList(model.modelName, query);

  if (error) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error),
    });

    return;
  }

  listResult.data = Array.from(data.data);
  pageLoad[cacheKey] = listResult;

  self.setState({
    ...self.state,

    loading: false,
    pageLoad, // cause of pointer, no need to change in setState
  });
};


export const onSalemansChange = async (self, event, data) => {
  event.preventDefault();
  console.log('aaaaaaaaaaaaa')
  const currentState = self.state;
  const {
    isListComponent,
    query, object,
    model, pageLoad,
    modelName,
  } = currentState;
  // console.log('Tube  pageLoad:', pageLoad.salesmanId.data)
  const { name, value } = getInputValue(data);

  const changedFields = createDraft(isListComponent ? query : object);
  changedFields[name] = value;
  pageLoad.salesmanId.data.forEach(element => {
    if (value === element._id) {
      changedFields['salesmanName'] = element.userName;
    }
  });

  const newState = finishDraft(changedFields);

  if (isListComponent) { // in list page
    self.setState({
      ...currentState,
      query: newState,
    });
  } else { // in form page
    self.setState({
      ...currentState,
      object: newState,
    });
  }
}