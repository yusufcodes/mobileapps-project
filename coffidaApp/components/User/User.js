import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import Button from '../Global/Button';
import getUser from '../../functions/network/getUser';
import Review from '../CoffeeShop/Review';

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  heading: {
    textAlign: 'center',
  },
  singleDetail: {
    flexDirection: 'row',
  },
});

export default function User({navigation}) {
  const [details, setDetails] = useState({});
  const [, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);

  const displayUpdate = () => navigation.navigate('Update', {details});

  useFocusEffect(
    React.useCallback(() => {
      async function response() {
        const response = await getUser();
        const {
          email,
          first_name,
          last_name,
          favourite_locations,
          liked_reviews,
          reviews,
        } = response.data;
        setDetails({
          email,
          firstName: first_name,
          lastName: last_name,
        });
        setLocations(favourite_locations);
        setReviews(reviews);
        setLikedReviews(liked_reviews);
      }

      response();
    }, []),
  );

  return (
    <ScrollView style={styles.root}>
      <Title style={styles.heading}>My Profile</Title>
      <View style={styles.details}>
        <Subheading>Personal Details</Subheading>

        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>First Name: </Paragraph>
          <Paragraph>{details.firstName}</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Last Name: </Paragraph>
          <Paragraph>{details.lastName}</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Email: </Paragraph>
          <Paragraph>{details.email}</Paragraph>
        </View>
      </View>
      <Button text="Update Details" handler={displayUpdate} />
      <Title>My Reviews</Title>
      {reviews.map(
        (
          {
            review: {
              review_body,
              overall_rating,
              price_rating,
              quality_rating,
              clenliness_rating,
              likes,
            },
          },
          index,
        ) => (
          <View key={index}>
            <Review
              details={{
                review_body,
                overall_rating,
                price_rating,
                quality_rating,
                clenliness_rating,
                likes,
              }}
            />
          </View>
        ),
      )}
      <Title>My Liked Reviews</Title>
      {likedReviews.map(
        (
          {
            review: {
              review_body,
              overall_rating,
              price_rating,
              quality_rating,
              clenliness_rating,
              likes,
            },
          },
          index,
        ) => (
          <View key={index}>
            <Review
              details={{
                review_body,
                overall_rating,
                price_rating,
                quality_rating,
                clenliness_rating,
                likes,
              }}
            />
          </View>
        ),
      )}
    </ScrollView>
  );
}
