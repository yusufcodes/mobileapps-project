import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, TextInput, IconButton} from 'react-native-paper';
import Star from '../Global/Star';

const styles = StyleSheet.create({
  root: {
    padding: 50,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function AddReview() {
  const [overall, setOverall] = useState(0);
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [clean, setClean] = useState(0);
  const [review, setReview] = React.useState('');

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);
  return (
    <View style={styles.root}>
      <Title>Add Review</Title>

      <View style={styles.rating}>
        <Text>Overall: </Text>
        <Star handler={handleOverall} rating={overall} />
        <IconButton
          icon="close-circle"
          size={20}
          onPress={() => setOverall(0)}
        />
      </View>

      <View style={styles.rating}>
        <Text>Price: </Text>
        <Star handler={handlePrice} rating={price} />
        <IconButton icon="close-circle" size={20} onPress={() => setPrice(0)} />
      </View>

      <View style={styles.rating}>
        <Text>Quality: </Text>
        <Star handler={handleQuality} rating={quality} />
        <IconButton
          icon="close-circle"
          size={20}
          onPress={() => setQuality(0)}
        />
      </View>

      <View style={styles.rating}>
        <Text>Cleanliness: </Text>
        <Star handler={handleClean} rating={clean} />
        <IconButton icon="close-circle" size={20} onPress={() => setClean(0)} />
      </View>

      <TextInput
        label="Review"
        mode="outlined"
        placeholder="Enter your review here..."
        multiline
        dense
        value={review}
        onChangeText={(review) => setReview(review)}
      />
    </View>
  );
}
