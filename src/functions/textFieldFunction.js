
export const onValueChange = async (inSelf, text) => {

  
  const { self } = inSelf.context;

  const { name } = inSelf.props;
  const { onChange } = self;

  
  const data = { type: 'input.textField', name, value: text };

  onChange(data);
}

