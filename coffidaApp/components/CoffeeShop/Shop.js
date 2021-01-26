import React from 'react';
import {View, Text} from 'react-native';

export default function Shop({route}) {
  const {id} = route.params;
  return (
    <View>
      <Text>Coffee Shop ID: {id}</Text>
    </View>
  );
}
