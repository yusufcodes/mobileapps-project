import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

export default function Button({text, icon, handler}) {
  return (
    <PaperButton icon={icon} mode="contained" onPress={() => handler()}>
      {text}
    </PaperButton>
  );
}
