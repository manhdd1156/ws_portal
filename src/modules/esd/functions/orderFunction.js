export const onProductSearchChange = async (self, e, searchQuery, cacheKey) => {
  e.persist();
  self.setState(LOADING_STATE);

  const pageLoad = { ...self.state.pageLoad }; // change pageLoad to rebuild selector cache
  const { refModels } = self.state;
  const model = refModels.find(f => f.modelName === 'v2/cspProducts');
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
export const onSendWithoutCreate = async (self) => {
  self.setState(LOADING_STATE);

  const {
    apiEndpoint, model, object,
    gotoObjectListAfterSubmit, gotoNextAfterSubmit,
  } = self.state;

  const { error, data } = validateData(model, object);

  data.orderState = ORDER_STATE.SALES_APPROVE;
  // console.log('Tube  data:', data)
  if (error) {
    self.setState({
      loading: false,
      success: false,
      error: true,
      messages: error,
    });
    return;
  }

  const result = await apiCreate(apiEndpoint.create, data);
  const error2 = result.error;

  if (error2) {
    self.setState({
      loading: false,
      error: true,
      messages: apiError2Messages(error2),
    });
  } else {
    // console.log('onCreate.result', result);

    self.setState({
      goToObjectList: gotoObjectListAfterSubmit || false,
      goToNextStep: gotoNextAfterSubmit || false,
      loading: false,
      success: true,
      messages: 'system:msg.update.success',

      object: {
        ...object,
        _id: result.data.data._id,
      },
    });
  }
}