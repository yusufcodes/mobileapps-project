import React from 'react';
import {View, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';

export default function Star({
  handler = null,
  rating,
  starSize = 25,
  disabled = false,
  starMargin = 5,
}) {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      marginHorizontal: starMargin,
    },
    container: {
      justifyContent: 'center',
    },
  });

  return (
    <View style={[styles.root]}>
      <StarRating
        starStyle={styles.star}
        starSize={starSize}
        fullStarColor="#53433A"
        maxStars={5}
        buttonStyle={styles.button}
        containerStyle={styles.container}
        rating={rating}
        disabled={disabled}
        selectedStar={(rating) => handler(rating)}
      />
    </View>
  );
}
