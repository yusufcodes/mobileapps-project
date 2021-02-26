import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import LikeButton from '../../Global/LikeButton';
import Button from '../../Global/Button';
import getUser from '../../../functions/network/getUser';
import favouriteLocation from '../../../functions/network/favouriteLocation';
import showToast from '../../../functions/showToast';
import Star from '../../Global/Star';

export default function Heading({details, navigation, id}) {
  const {
    name,
    town,
    overallRating,
    priceRating,
    qualityRating,
    cleanlinessRating,
  } = details;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  const navigateReview = () => {
    navigation.navigate('AddReview', {id, name});
  };

  const styles = StyleSheet.create({
    root: {
      padding: 50,
      backgroundColor: '#fcd5ce',
    },
    text: {
      alignItems: 'center',
    },
    name: {
      fontSize: 30,
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
    singleRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  const performFavourite = async (location_id, unfav = false) => {
    const response = await favouriteLocation(location_id, unfav);
    if (!response || response.status !== 200) {
      showToast('Coffee shop could not be liked/unliked. Please try again.');
      return;
    }
    showToast(`Location has been ${unfav ? 'unliked' : 'liked'}`);
  };

  const handleFavourite = async () => {
    console.log('Running handleFavourite...');

    // get user info
    const userDetails = await getUser();
    if (!userDetails) {
      showToast('Coffee shop could not be liked/unliked. Please try again.');
      return;
    }

    // Retrieve list of favourited locations
    const {favourite_locations} = userDetails.data;

    // Empty favourite locations: can add location to favourites without checking
    if (favourite_locations.length === 0) {
      await performFavourite(id);
    } else {
      // Check if location to be liked has already been liked, determine like or unlike action
      const location = favourite_locations.find(
        (currentLocation) => currentLocation.location_id === id,
      );

      // Unlike the location (removed from favourite_locations)
      if (location) {
        const unfav = true;
        await performFavourite(id, unfav);
      } else {
        // Like the location (add to favourite_locations)
        await performFavourite(id);
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
          <View style={styles.singleRating}>
            <Paragraph>Overall: </Paragraph>
            <Star
              rating={Math.floor(overallRating)}
              starSize={15}
              starMargin={2}
              disabled
            />
          </View>
          <View style={styles.singleRating}>
            <Paragraph>Price: </Paragraph>
            <Star
              rating={Math.floor(priceRating)}
              starSize={15}
              starMargin={2}
              disabled
            />
          </View>
          <View style={styles.singleRating}>
            <Paragraph>Quality: </Paragraph>
            <Star
              rating={Math.floor(qualityRating)}
              starSize={15}
              starMargin={2}
              disabled
            />
          </View>
          <View style={styles.singleRating}>
            <Paragraph>Cleanliness: </Paragraph>
            <Star
              rating={Math.floor(cleanlinessRating)}
              starSize={15}
              starMargin={2}
              disabled
            />
          </View>
        </View>
      </View>
      <Button
        accessibilityLabel="OK to delete review"
        accessibilityHint="Confirm action to delete this review"
        accessibilityRole="button"
        text="Add A Review"
        handler={navigateReview}
      />
    </View>
  );
}
