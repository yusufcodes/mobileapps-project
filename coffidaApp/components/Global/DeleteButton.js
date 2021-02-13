import React from 'react';
import {IconButton, Colors} from 'react-native-paper';

export default function DeleteButton(props) {
  const {handler, size = 30} = props;
  return (
    <IconButton
      icon="delete"
      size={size}
      style={{
        marginHorizontal: 0,
      }}
      onPress={() => handler()}
    />
  );
}
