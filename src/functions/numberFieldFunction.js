
export const onValueChange = async (inSelf, values) => {

  
  const { self } = inSelf.context;

  const { name } = inSelf.props;
  const { onChange } = self;

  
  const data = { type: 'input.numberField', name, value: values };

  onChange(data);
}

