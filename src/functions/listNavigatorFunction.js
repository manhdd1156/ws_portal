
export const selectAllObjectList = async (inSelf) => {

  
  const { self } = inSelf.context;
  const { state, onSelectAllObjectList } = self;
  const { selectedAll } = state;

  const data = { type: 'checkbox', checked: !selectedAll };
  console.log('dataaaaaaaaaaaaaaa', data)

  onSelectAllObjectList(data);

}

export const onChangeActionList = async (inSelf , value) => {

  
    const { self } = inSelf.context;
    const { state, onSelectAllObjectList } = self;
    const { actionList } = self.props
    if (value) {
      const selecteAction = actionList.find(f => f.actionCode === value);
      if (selecteAction) {
        await (selecteAction.actionHandler)(self);
      }
    }
}


