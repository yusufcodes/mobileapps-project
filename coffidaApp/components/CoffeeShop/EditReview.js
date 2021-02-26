import React, {useState} from 'react';
import {View, Text, StyleSheet, Keyboard, Image} from 'react-native';
import {Headline, TextInput, IconButton, HelperText} from 'react-native-paper';
import RNFS from 'react-native-fs';
import Star from '../Global/Star';
import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import photoReview from '../../functions/network/photoReview';
import profanityFilter from '../../functions/profanityFilter';
import updateReview from '../../functions/network/updateReview';
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default function EditReview({route, navigation}) {
  // TODO: Pass in name of the location
  const {
    location_id,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    serverPhoto,
  } = route.params;

  // TODO: Pass in name here
  // useEffect(() => {
  //   navigation.setOptions({title: `Add Review: ${name}`});
  // }, [name]);

  const [overall, setOverall] = useState(overall_rating);
  const [price, setPrice] = useState(price_rating);
  const [quality, setQuality] = useState(quality_rating);
  const [clean, setClean] = useState(clenliness_rating);
  const [review, setReview] = React.useState(review_body);
  const [validReview, setValidReview] = useState(true);

  const [isPhotoDeleted, setIsPhotoDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State to check if values from profanity filter are mentioned
  const [isProfanity, setIsProfanity] = useState(false);

  // Photo state to determine if the user has attached a photo
  const [photoData, setPhotoData] = useState(serverPhoto);

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

    console.log('EditReview: Data being sent in PATCH: ');
    console.log(data);

    const response = await updateReview(location_id, review_id, data);

    if (response?.status === 200) {
      showToast('Review edited!');
      console.log('Review edited!');
      // Only runs if a photo has been taken.
      if (photoData) {
        const uploadPhoto = await photoReview(
          location_id,
          review_id,
          photoData,
        );
        if (uploadPhoto.status === 200) {
          showToast('Photo successfully added to review');
          console.log('EditReview: Photo successfully added to review');
        } else {
          showToast(
            "Sorry, we couldn't upload your photo to the review. Please try again!",
          );
          return;
        }
        console.log(
          'EditReview: Review added with photo: navigating back now...',
        );
      }
      setIsLoading(false);
      navigation.goBack();
    } else {
      showToast('Error editing review, please try again.');
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.root}>
      <Headline>Edit Review</Headline>

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
          <DeleteButton handler={() => deletePhotoFile()} size={20} />
        </View>
      ) : null}
      <View style={styles.buttonGroup}>
        <Button
          icon="camera"
          accessibilityLabel="Open Camera"
          accessibilityHint="Displays screen to allow for you to take a photo for your review"
          accessibilityRole="button"
          text={
            photoData && !isPhotoDeleted
              ? 'Retake Photo'
              : 'Add Photo To Review'
          }
          handler={handlePhoto}
        />

        <Button
          text="Submit Review"
          accessibilityLabel="Submit Review"
          accessibilityHint="Confirm action to submit your review"
          accessibilityRole="button"
          loading={isLoading}
          handler={submitReview}
        />
      </View>
    </View>
  );
}
