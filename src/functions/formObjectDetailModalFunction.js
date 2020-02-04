

export const _closeSelector = (inSelf) => {
  const { self } = inSelf.context;
    const { modalVisible } = self.state;
    self.setState({ modalVisible: !modalVisible });
}

