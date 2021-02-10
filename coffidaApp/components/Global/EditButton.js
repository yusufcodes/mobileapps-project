import React from 'react';
import {IconButton, Colors} from 'react-native-paper';

export default function EditButton(props) {
  const {handler, size = 30} = props;
  return (
    <IconButton icon="comment-edit" size={size} onPress={() => handler()} />
  );
}
