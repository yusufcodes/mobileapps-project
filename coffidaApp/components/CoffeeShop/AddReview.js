import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Keyboard, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {Headline, TextInput, HelperText} from 'react-native-paper';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import getUser from '../../functions/network/getUser';
import photoReview from '../../functions/network/photoReview';
import addReview from '../../functions/network/addReview';
import profanityFilter from '../../functions/profanityFilter';
import commonStyles from '../../styles/commonStyles';
import DisplayRating from '../Global/DisplayRating';

const styles = StyleSheet.create({
  image: {marginVertical: 20, width: 300, height: 400},
  imagePreview: {flexDirection: 'column', alignItems: 'center'},
});

export default function AddReview({route}) {
  const {id, name} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: `Add Review: ${name}`});
  }, [name]);

  // State for fields needed to add a review.
  const [overall, setOverall] = useState(0);
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [clean, setClean] = useState(0);
  const [review, setReview] = useState('');
  const [validReview, setValidReview] = useState(true);
  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State to check if values from profanity filter are mentioned
  const [isProfanity, setIsProfanity] = useState(false);

  // Photo state to determine if the user has attached a photo
  const [photoData, setPhotoData] = useState(false);

  const handleOverall = (rating) => setOverall(rating);
  const handlePrice = (rating) => setPrice(rating);
  const handleQuality = (rating) => setQuality(rating);
  const handleClean = (rating) => setClean(rating);

  // Open the camera for user to take a photo for the review
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

  const submitReview = async () => {
    setIsLoading(true);
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

      // Perform logic to add photo that is taken to the review, only if a photo is taken
      if (photoData) {
        // Logic to find the review that was just added
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
        const uploadPhoto = await photoReview(
          id,
          reviewToFind.review.review_id,
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
      showToast("Sorry, we couldn't submit your review. Please try again.");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView>
      <View style={[commonStyles.scrollViewMargin]}>
        <Headline>Add Review</Headline>
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
          mode="outlined"
          placeholder="Enter your review here..."
          label="Review"
          multiline
          numberOfLines={6}
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
          <View style={styles.imagePreview}>
            <Image
              accessibilityLabel="Image to be added to this review"
              source={{
                uri: photoData?.uri,
              }}
              style={[styles.image]}
            />
            <Button
              icon="delete"
              accessibilityLabel="Delete photo"
              accessibilityHint="Remove the photo that has been taken for this review"
              accessibilityRole="button"
              text="Delete Photo"
              handler={deletePhotoFile}
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
            accessibilityLabel="Submit Review"
            accessibilityHint="Confirm action to submit your review"
            accessibilityRole="button"
            text="Submit"
            loading={isLoading}
            handler={submitReview}
          />
        </View>
      </View>
    </ScrollView>
  );
}
