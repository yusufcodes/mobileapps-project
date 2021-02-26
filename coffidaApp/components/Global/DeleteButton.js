import React from 'react';
import {IconButton} from 'react-native-paper';

export default function DeleteButton(props, {...rest}) {
  const {handler, size = 30} = props;
  return (
    <IconButton
      accessibilityLabel="Perform delete action"
      accessibilityHint="Will delete the item you are currently viewing and clicking onto"
      accessibilityRole="button"
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
