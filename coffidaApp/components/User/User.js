import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import Button from '../Global/Button';
import getToken from '../../functions/getToken';
import getId from '../../functions/getId';

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
  const [details, setDetails] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);

  const displayUpdate = () => navigation.navigate('Update');
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
        setDetails([email, first_name, last_name]);
        setLocations(favourite_locations);
        setReviews(reviews);
        setLikedReviews(liked_reviews);
      } catch (error) {
        console.log(error);
      }
    }

    response();
  }, []);

  return (
    <View style={styles.root}>
      <Title style={styles.heading}>My Profile</Title>
      <View style={styles.details}>
        <Subheading>Personal Details</Subheading>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>First Name: </Paragraph>
          <Paragraph>Yusuf</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Last Name: </Paragraph>
          <Paragraph>Chowdhury</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Email: </Paragraph>
          <Paragraph>17031422@stu.mmu.ac.uk</Paragraph>
        </View>
      </View>
      <Button text="Update Details" handler={displayUpdate} />
    </View>
  );
}
