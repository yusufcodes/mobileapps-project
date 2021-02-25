import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Keyboard, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {Title, TextInput, IconButton, HelperText} from 'react-native-paper';
import Star from '../Global/Star';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import getToken from '../../functions/getToken';
import getUser from '../../functions/network/getUser';
import photoReview from '../../functions/network/photoReview';
import addReview from '../../functions/network/addReview';
import profanityFilter from '../../functions/profanityFilter';
import DeleteButton from '../Global/DeleteButton';

const styles = StyleSheet.create({
  root: {
    padding: 50,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default function AddReview({route}) {
  const {id} = route.params;
  const navigation = useNavigation();

  // State for fields needed to add a review.
  const [overall, setOverall] = useState(0);
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [clean, setClean] = useState(0);
  const [review, setReview] = useState('');
  const [validReview, setValidReview] = useState(true);
  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false);

  // State to check if values from profanity filter are mentioned
  const [isProfanity, setIsProfanity] = useState(false);

  // Photo state to determine if the user has attached a photo
  const [photoData, setPhotoData] = useState(false);

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);

  const handlePhoto = () => {
    setIsPhotoDeleted(false);
    navigation.navigate('UploadPhoto', {setPhotoData});
  };

  const deletePhotoFile = () => {
    RNFS.unlink(photoData?.uri);
    setPhotoData(null);
    setIsPhotoDeleted(true);
    showToast('Photo removed');
  };

  const submitReview = async () => {
    // Reset error state values
    setValidReview(true);
    setIsProfanity(false);
    Keyboard.dismiss();

    // Check that there is enough written in review body before submitting
    if (review.length < 4) {
      setValidReview(false);
      return;
    }

    // Perform Profanity Filter check
    const checkIfProfanity = profanityFilter(review);
    if (checkIfProfanity) {
      setIsProfanity(true);
      return;
    }

    const data = {
      overall_rating: overall,
      price_rating: price,
      quality_rating: quality,
      clenliness_rating: clean,
      review_body: review,
    };

    const response = await addReview(id, data);

    if (response?.status === 201) {
      showToast('Review submitted!');

      // Only runs if a photo has been taken.
      if (photoData) {
        console.log('AddReview: Photo found, attempting to upload...');
        const userDetails = await getUser();
        // Find the review the user has just uploaded
        const reviewToFind = userDetails.data.reviews.find(
          (item) =>
            review === item.review.review_body &&
            clean === item.review.clenliness_rating &&
            overall === item.review.overall_rating &&
            price === item.review.price_rating &&
            quality === item.review.quality_rating,
        );

        console.log(`New Review ID: ${reviewToFind.review.review_id}`);
        console.log('AddReview: Adding photo taken to the review...');
        const uploadPhoto = await photoReview(
          id,
          reviewToFind.review.review_id,
          photoData,
        );
        if (uploadPhoto.status === 200) {
          showToast('Photo successfully added to review');
          console.log('AddReview: Photo successfully added to review');
        } else {
          showToast(
            "Sorry, we couldn't upload your photo to the review. Please try again!",
          );
          return;
        }
        console.log(
          'AddReview: Review added with photo: navigating back now...',
        );
      }

      navigation.goBack();
    } else {
      showToast("Sorry, we couldn't submit your review. Please try again.");
    }
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
          error={!validReview}
          value={review}
          onChangeText={(review) => setReview(review)}
        />
        {!validReview ? (
          <HelperText type="error">
            We need a little more info! Please ensure the review has at least
            four letters.
          </HelperText>
        ) : null}
        {isProfanity ? (
          <HelperText type="error" visible={isProfanity}>
            Sorry, it looks like you just mentioned tea, cakes and pastries in
            your review. Please remove these from your review. (We prefer
            comments on our amazing coffee!)
          </HelperText>
        ) : null}

        {photoData && !isPhotoDeleted ? (
          <View>
            <Image
              source={{
                uri: photoData?.uri,
              }}
              style={styles.image}
            />
            <DeleteButton handler={() => deletePhotoFile()} size={20} />
          </View>
        ) : null}
        <Button
          text={
            photoData && !isPhotoDeleted
              ? 'Retake Photo'
              : 'Add Photo To Review'
          }
          handler={handlePhoto}
        />
        <Button text="Submit Review" handler={submitReview} />
      </View>
    </>
  );
}
