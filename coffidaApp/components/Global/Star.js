import React from 'react';
import {View, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';

export default function Star({handler, rating}) {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      marginHorizontal: 5,
    },
    container: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <StarRating
        starSize={25}
        maxStars={5}
        buttonStyle={styles.button}
        containerStyle={styles.container}
        rating={rating}
        selectedStar={(rating) => handler(rating)}
      />
    </View>
  );
}
