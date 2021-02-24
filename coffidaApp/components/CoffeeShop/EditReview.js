import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {Title, TextInput, IconButton} from 'react-native-paper';
import Star from '../Global/Star';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import getToken from '../../functions/getToken';

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

const axios = require('axios');

export default function EditReview({route, navigation}) {
  //   const {id} = route.params;
  //   console.log(id);
  const id = 0; // TODO: change this
  const {
    location_id,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
  } = route.params;
  console.log(route.params);

  // TODO: Populate these with values passed in via state
  const [overall, setOverall] = useState(overall_rating);
  const [price, setPrice] = useState(price_rating);
  const [quality, setQuality] = useState(quality_rating);
  const [clean, setClean] = useState(clenliness_rating);
  const [review, setReview] = React.useState(review_body);

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);

  // TODO: Change endpoint being hit here.
  const submitReview = async () => {
    console.log('EditReview: Submitting Review...');
    Keyboard.dismiss();
    const token = await getToken();
    try {
      const response = await axios({
        method: 'patch',
        url: `http://10.0.2.2:3333/api/1.0.0/location/${location_id}/review/${review_id}`,
        responseType: 'json',
        headers: {'X-Authorization': token},
        data: {
          overall_rating: overall,
          price_rating: price,
          quality_rating: quality,
          clenliness_rating: clean,
          review_body: review,
        },
      });
      if (response?.status === 200) {
        showToast('Review edited!');
        console.log('Review edited!');
        navigation.goBack();
      } else {
        showToast('Error editing review...');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.root}>
      <Title>Edit Review</Title>

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
      <Button text="Submit Review" handler={submitReview} />
    </View>
  );
}
