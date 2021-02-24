import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard, Image} from 'react-native';
import {Title, TextInput, IconButton} from 'react-native-paper';
import Star from '../Global/Star';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import getToken from '../../functions/getToken';
import getUser from '../../functions/network/getUser';
import photoReview from '../../functions/network/photoReview';

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

export default function AddReview({route, navigation}) {
  const {id} = route.params;
  console.log(id);

  const [overall, setOverall] = useState(0);
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [clean, setClean] = useState(0);
  const [review, setReview] = useState('');
  const [photoData, setPhotoData] = useState(null);

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);

  const handlePhoto = () => navigation.navigate('UploadPhoto', {setPhotoData});

  console.log(`photoData: ${photoData}`);

  const submitReview = async () => {
    console.log('Submitting Review...');
    Keyboard.dismiss();
    const token = await getToken();

    // TODO: Abstract method
    const response = await axios({
      method: 'post',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${id}/review`,
      responseType: 'json',
      headers: {'X-Authorization': token},
      data: {
        overall_rating: overall,
        price_rating: price,
        quality_rating: quality,
        clenliness_rating: clean,
        review_body: review,
      },
    }).then(async (response) => {
      // Once review is submitted: check if we need to upload a photo
      if (response?.status === 201) {
        showToast('Review submitted!');
        console.log('Review submitted!');

        // Only runs if a photo has been taken.
        if (photoData) {
          console.log('AddReview: Photo found, attempting to upload...');
          console.log('photo: getting user info');
          // .. do logic to add photo to review
          const userDetails = await getUser();
          // console.log(userDetails.data.reviews);
          const reviewToFind = userDetails.data.reviews.find(
            (item, index) =>
              review === item.review.review_body &&
              clean === item.review.clenliness_rating &&
              overall === item.review.overall_rating &&
              price === item.review.price_rating &&
              quality === item.review.quality_rating,
          );

          console.log('got user');
          console.log(`New Review ID: ${reviewToFind.review.review_id}`);

          console.log('AddReview: Adding photo taken to the review...');
          const uploadPhoto = await photoReview(
            id,
            reviewToFind.review.review_id,
            photoData,
          );
          if (uploadPhoto.status === 200) {
            console.log('AddReview: Photo successfully added to review');
          }
          console.log(
            'AddReview: Review added with photo: navigating back now...',
          );
        }

        navigation.goBack();
      }
    });
  };

  return (
    <>
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
          <IconButton
            icon="close-circle"
            size={20}
            onPress={() => setPrice(0)}
          />
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
          <IconButton
            icon="close-circle"
            size={20}
            onPress={() => setClean(0)}
          />
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
        <Button text="Add Photo To Review" handler={handlePhoto} />
        <Image
          source={{
            uri: photoData?.uri,
          }}
        />

        <Button text="Submit Review" handler={submitReview} />
      </View>
      {/* {takePhoto ? <Camera /> : null} */}
    </>
  );
}
