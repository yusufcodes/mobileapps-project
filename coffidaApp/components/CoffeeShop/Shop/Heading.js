import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import LikeButton from '../../Global/LikeButton';
import Button from '../../Global/Button';
import getUser from '../../../functions/network/getUser';
import favouriteLocation from '../../../functions/network/favouriteLocation';
import showToast from '../../../functions/showToast';

export default function Heading({details, navigation, id}) {
  const {
    name,
    town,
    overallRating,
    priceRating,
    qualityRating,
    cleanlinessRating,
  } = details;

  const navigateReview = () => {
    navigation.navigate('AddReview', {id});
  };

  const styles = StyleSheet.create({
    root: {
      padding: 50,
      color: 'red',
      borderColor: 'red',
    },
    text: {
      alignItems: 'center',
    },
    name: {
      fontSize: 30,
      borderColor: 'blue',
    },
    ratingsContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 10,
    },
    ratings: {
      flexDirection: 'column',
    },
    ratingIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      padding: 10,
    },
    reviewButton: {
      padding: 5,
      margin: 10,
    },
  });

  const handleFavourite = async () => {
    console.log('Running handleFavourite...');

    // get user info
    const userDetails = await getUser();

    // Retrieve list of favourited locations
    const {favourite_locations} = userDetails.data;

    // Empty favourite locations: can add location to favourites without checking
    if (favourite_locations.length === 0) {
      await favouriteLocation(id);
      showToast('Success: location has been favourited');
    } else {
      // Check if location to be liked has already been liked, determine like or unlike action
      const location = favourite_locations.find(
        (currentLocation) => currentLocation.location_id === id,
      );

      // Unlike the location (removed from favourite_locations)
      if (location) {
        const unfav = true;
        await favouriteLocation(id, unfav);
        showToast('Success: location has been unfavourited');
      } else {
        // Like the location (add to favourite_locations)
        await favouriteLocation(id);
        showToast('Success: location has been favourited');
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.text}>
        <Title style={styles.name}>{name}</Title>
        <Subheading>{town}</Subheading>
      </View>

      <View style={styles.ratingsContainer}>
        <View style={styles.ratingIcon}>
          <LikeButton handler={handleFavourite} />
        </View>

        <View style={styles.ratings}>
          <Title>Ratings</Title>
          <Paragraph>Overall: {overallRating}</Paragraph>
          <Paragraph>Price: {priceRating}</Paragraph>
          <Paragraph>Quality: {qualityRating}</Paragraph>
          <Paragraph>Cleanliness: {cleanlinessRating}</Paragraph>
        </View>
      </View>
      <Button text="Add A Review" handler={navigateReview} />
    </View>
  );
}
