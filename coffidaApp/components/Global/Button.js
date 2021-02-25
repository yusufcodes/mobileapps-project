import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

export default function Button({text, icon, handler, ...rest}) {
  return (
    <PaperButton
      {...rest}
      icon={icon}
      mode="contained"
      onPress={() => handler()}>
      {text}
    </PaperButton>
  );
}
