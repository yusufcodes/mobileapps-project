import React from 'react';
import {IconButton, Colors} from 'react-native-paper';

export default function LikeButton(props) {
  const {handler, size = 30} = props;
  return (
    <IconButton
      accessibilityLabel="Perform like or unlike"
      accessibilityHint="This performs a like or unlike on the item you are currently viewing"
      accessibilityRole="button"
      icon="heart"
      color={Colors.red500}
      size={size}
      style={{
        marginHorizontal: 0,
      }}
      onPress={() => handler()}
    />
  );
}
