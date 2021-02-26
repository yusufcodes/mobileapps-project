import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Star from './Star';

export default function DisplayRating({
  title,
  starHandler,
  starRating,
  starSetter,
}) {
  const styles = StyleSheet.create({
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    starDelete: {
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.rating}>
      <View>
        <Text>{title}</Text>
      </View>
      <View style={styles.starDelete}>
        <Star handler={starHandler} rating={starRating} />
        <IconButton
          icon="close-circle"
          size={20}
          onPress={() => starSetter(0)}
        />
      </View>
    </View>
  );
}
