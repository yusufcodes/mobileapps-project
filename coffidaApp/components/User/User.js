import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import Button from '../Global/Button';
import getToken from '../../functions/getToken';
import getId from '../../functions/getId';
import Review from '../CoffeeShop/Review';

const axios = require('axios');

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
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);

  const displayUpdate = () => navigation.navigate('Update', {details});
  useEffect(() => {
    async function response() {
      const token = await getToken();
      const id = await getId();
      try {
        const response = await axios({
          method: 'get',
          url: `http://10.0.2.2:3333/api/1.0.0/user/${parseInt(id)}`,
          responseType: 'json',
          headers: {'X-Authorization': token},
        });
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
        console.log(reviews);
        setLikedReviews(liked_reviews);
      } catch (error) {
        console.log(error);
      }
    }

    response();
  }, []);

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
    </ScrollView>
  );
}
