import React from 'react';
import {IconButton} from 'react-native-paper';

export default function EditButton(props) {
  const {handler, size = 30} = props;
  return (
    <IconButton
      accessibilityLabel="Edit Review"
      accessibilityHint="Will navigate you to the form to edit yor review"
      accessibilityRole="button"
      icon="comment-edit"
      size={size}
      style={{
        marginHorizontal: 0,
      }}
      onPress={() => handler()}
    />
  );
}
