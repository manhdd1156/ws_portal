
export const onValueChange = async (inSelf, value) => {

  
  const { self } = inSelf.context;

  const { name } = inSelf.props;
  const { onChange } = self;

  
  const data = { type: 'radio', name, checked: !value, };
  onChange(data);
}

