import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, Image} from 'react-native';
import {Headline, TextInput, HelperText} from 'react-native-paper';
import RNFS from 'react-native-fs';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import addPhotoReview from '../../functions/network/addPhotoReview';
import deletePhotoReview from '../../functions/network/deletePhotoReview';
import profanityFilter from '../../functions/profanityFilter';
import updateReview from '../../functions/network/updateReview';
import commonStyles from '../../styles/commonStyles';
import DisplayRating from '../Global/DisplayRating';

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default function EditReview({route, navigation}) {
  const {
    location_id,
    location_name,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    serverPhoto,
  } = route.params;

  useEffect(() => {
    navigation.setOptions({title: `Edit Review: ${location_name}`});
  }, [location_name]);

  // State for fields needed to edit a review.
  const [overall, setOverall] = useState(overall_rating);
  const [price, setPrice] = useState(price_rating);
  const [quality, setQuality] = useState(quality_rating);
  const [clean, setClean] = useState(clenliness_rating);
  const [review, setReview] = React.useState(review_body);
  const [validReview, setValidReview] = useState(true);

  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [reviewId, setReviewId] = useState(null);

  // State to check if values from profanity filter are mentioned
  const [isProfanity, setIsProfanity] = useState(false);

  // Photo state to determine if the user has attached a photo
  const [photoData, setPhotoData] = useState(serverPhoto);

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);

  // Open the camera for user to add or retake a photo for the review
  const handlePhoto = () => {
    setIsPhotoDeleted(false);
    navigation.navigate('UploadPhoto', {setPhotoData});
  };

  // Remove photo from local storage
  const deletePhotoFile = () => {
    RNFS.unlink(photoData?.uri);
    setPhotoData(null);
    setIsPhotoDeleted(true);
    showToast('Photo removed');
  };

  const handleDeletePhoto = async () => {
    const response = await deletePhotoReview(location_id, reviewId);
    if (response.status !== 200) {
      showToast("Sorry, we couldn't delete this photo. Please try again.");
      return;
    }
    deletePhotoFile();
  };

  const submitReview = async () => {
    setIsLoading(true);
    // Reset error state values
    setValidReview(true);
    setIsProfanity(false);
    Keyboard.dismiss();

    // Check that there is enough written in review body before submitting
    if (review.length < 4) {
      setValidReview(false);
      setIsLoading(false);
      return;
    }

    // Perform Profanity Filter check
    const checkIfProfanity = profanityFilter(review);
    if (checkIfProfanity) {
      setIsProfanity(true);
      setIsLoading(false);
      return;
    }

    // Construct data for PATCH depending on which values are altered
    const data = {};

    if (overall !== overall_rating) {
      data.overall_rating = overall;
    }
    if (price !== price_rating) {
      data.price_rating = price;
    }
    if (quality !== quality_rating) {
      data.quality_rating = quality;
    }
    if (clean !== clenliness_rating) {
      data.clenliness_rating = clean;
    }
    if (review !== review_body) {
      data.review_body = review;
    }

    const response = await updateReview(location_id, review_id, data);

    if (response?.status === 200) {
      showToast('Review edited!');
      // Perform logic to add photo that is taken to the review, only if a photo is taken
      if (photoData) {
        const uploadPhoto = await addPhotoReview(
          location_id,
          review_id,
          photoData,
        );
        if (uploadPhoto.status === 200) {
          showToast('Photo successfully added to review');
        } else {
          showToast(
            "Sorry, we couldn't upload your photo to the review. Please try again!",
          );
          return;
        }
      }
      setIsLoading(false);
      navigation.goBack();
    } else {
      showToast("Sorry, we couldn't edit your review. please try again.");
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.root}>
      <Headline>Edit Review</Headline>

      <DisplayRating
        title="Overall: "
        starHandler={handleOverall}
        starRating={overall}
        starSetter={setOverall}
      />
      <DisplayRating
        title="Price: "
        starHandler={handlePrice}
        starRating={price}
        starSetter={setPrice}
      />
      <DisplayRating
        title="Quality: "
        starHandler={handleQuality}
        starRating={quality}
        starSetter={setQuality}
      />
      <DisplayRating
        title="Cleanliness: "
        starHandler={handleClean}
        starRating={clean}
        starSetter={setClean}
      />

      <TextInput
        label="Review"
        mode="outlined"
        placeholder="Enter your review here..."
        multiline
        numberOfLines={6}
        dense
        value={review}
        error={!validReview}
        onChangeText={(review) => setReview(review)}
      />
      {!validReview ? (
        <HelperText type="error">
          We need a little more info! Please ensure the review has at least four
          letters.
        </HelperText>
      ) : null}
      {isProfanity ? (
        <HelperText type="error" visible={isProfanity}>
          Sorry, it looks like you just mentioned tea, cakes and pastries in
          your review. Please remove these from your review. (We prefer comments
          on our amazing coffee!)
        </HelperText>
      ) : null}

      {photoData && !isPhotoDeleted ? (
        <View>
          <Image
            accessibilityLabel="Image that is currently associated with this review"
            source={{
              uri: photoData?.uri,
            }}
            style={styles.image}
          />
          <Button
            icon="delete"
            accessibilityLabel="Delete photo"
            accessibilityHint="Remove the photo that has been taken for this review"
            accessibilityRole="button"
            text="Delete Photo"
            handler={handleDeletePhoto}
          />
        </View>
      ) : null}
      <View style={commonStyles.buttonGroup}>
        <Button
          icon="camera"
          accessibilityLabel="Open Camera"
          accessibilityHint="Displays screen to allow for you to take a photo for your review"
          accessibilityRole="button"
          text={photoData && !isPhotoDeleted ? 'Retake Photo' : 'Add Photo'}
          handler={handlePhoto}
        />

        <Button
          text="Submit Review"
          accessibilityLabel="Submit"
          accessibilityHint="Confirm action to submit your review"
          accessibilityRole="button"
          loading={isLoading}
          handler={submitReview}
        />
      </View>
    </View>
  );
}
