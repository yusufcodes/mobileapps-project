import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

export default function Loader({size = 'small'}) {
  return <ActivityIndicator animating size={size} color={Colors.black} />;
}
