import { Alert } from 'react-native'
export const onDeleteCustome = async (inSelf, t) => {

  const { onDeleteCancle, onDeleteConfirm } = inSelf.context.self;
  

    Alert.alert(
      'Thông báo',
      t('msg.delete.confirmMessage'),
      [
        { text: t('btn.confirm'), onPress: onDeleteConfirm },
        {
          text: t('btn.cancel'),
          // onPress: onDeleteCancle,
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
}

