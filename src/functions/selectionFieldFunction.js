
export const onValueChange = async (inSelf, text) => {

 
  const { self } = inSelf.context;
  const { name, multiple } = inSelf.props;
  const { onChange } = inSelf.context.self;

  const data = { type: 'input.selectionField', name, value: multiple ? text : text[0] };

  onChange(data);
}

