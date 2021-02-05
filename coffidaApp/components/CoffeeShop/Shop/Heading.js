import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import LikeButton from '../../Global/LikeButton';
import Button from '../../Global/Button';

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
    navigation.navigate('AddReview', {navigation, id});
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

  const handleFavourite = () => {
    console.log('Favourite handler');
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
