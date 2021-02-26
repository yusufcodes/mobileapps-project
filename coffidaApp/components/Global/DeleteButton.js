import React from 'react';
import {IconButton} from 'react-native-paper';

export default function DeleteButton(props, {...rest}) {
  const {handler, size = 30} = props;
  return (
    <IconButton
      icon="delete"
      size={size}
      style={{
        marginHorizontal: 0,
      }}
      onPress={() => handler()}
      {...rest}
    />
  );
}
