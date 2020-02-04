
export const onValueChange = async (inSelf, choosenDate) => {

  console.log('inSelf,choosenDate : ', inSelf, choosenDate)
  const { self } = inSelf.context;

  const { name } = inSelf.props;
  const { onChange } = self;

  const value = choosenDate ? choosenDate.toDate() : null;
  const data = { type: 'input.date', name, value };

  onChange(data);
}

export const _toggleSelector = (self) => {
  const newState = !self.state.selector
  self.setState({
    selector: newState,
  })
}
export const _submitSelection = (self) => {
  self._toggleSelector(self)
}

export const _closeSelector = (self) => {
  this.setState({
    selector: false,
    
  })
}

