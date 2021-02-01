import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {
  Title,
  Headline,
  Subheading,
  Button,
  IconButton,
  Colors,
  Paragraph,
  Divider,
} from 'react-native-paper';
// import Button from '../../Global/Button';
import LikeButton from '../../Global/LikeButton';

export default function Heading({details}) {
  const {
    name,
    town,
    overallRating,
    priceRating,
    qualityRating,
    cleanlinessRating,
  } = details;

  const styles = StyleSheet.create({
    root: {
      padding: 50,
      color: 'red',
      borderColor: 'red',
      // borderWidth: 2,
    },
    text: {
      // justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 30,
      borderColor: 'blue',
      // borderWidth: 1,
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
      // borderWidth: 1,
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
      <Button mode="contained" style={styles.reviewButton}>
        Add A Review
      </Button>
    </View>
  );
}
