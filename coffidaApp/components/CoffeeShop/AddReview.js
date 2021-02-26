import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Keyboard,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {Headline, TextInput, IconButton, HelperText} from 'react-native-paper';
import Star from '../Global/Star';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import getUser from '../../functions/network/getUser';
import photoReview from '../../functions/network/photoReview';
import addReview from '../../functions/network/addReview';
import profanityFilter from '../../functions/profanityFilter';
import DeleteButton from '../Global/DeleteButton';

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  starDelete: {
    flexDirection: 'row',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
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
      setIsLoading(false);
      navigation.goBack();
    } else {
      showToast("Sorry, we couldn't submit your review. Please try again.");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const DisplayRating = ({title, starHandler, starRating, starSetter}) => (
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

  return (
    <ScrollView>
      <View style={[styles.root]}>
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
        <View style={styles.buttonGroup}>
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
