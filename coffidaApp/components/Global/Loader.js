import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import commonStyles from '../../styles/commonStyles';

export default function Loader({size = 'small'}) {
  const styles = StyleSheet.create({
    root: {
      margin: 20,
    },
  });

  return (
    <ActivityIndicator
      animating
      size={size}
      style={[styles.root, commonStyles.primaryColor]}
    />
  );
}
