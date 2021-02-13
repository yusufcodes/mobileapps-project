import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Title, Subheading, Paragraph, List} from 'react-native-paper';
import Button from '../Global/Button';
import getUser from '../../functions/network/getUser';
import Review from '../CoffeeShop/Review';
import logout from '../../functions/network/logout';

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

  const handleLogout = () => {
    const performLogout = logout();
    if (performLogout) {
      navigation.navigate('SignUp');
    } else {
      console.log('Handle log out: Not working');
    }
  };

  // TODO: Error handling
  const refreshReviews = async () => {
    console.log('Refreshing reviews...');
    const response = await getUser();
    const {reviews} = response.data;
    setReviews(reviews);
  };

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
        console.log('Locations');
        console.log(locations);
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
      <Button text="Logout" handler={handleLogout} />
      <Title>My Liked Locations</Title>
      {locations.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.location_name}`}
          description={`Town: ${item.location_town} \nRating: ${item.avg_overall_rating}`}
          descriptionNumberOfLines={2}
          left={(props) => <List.Icon {...props} icon="coffee" />}
          onPress={() => navigation.navigate('Shop', {id: item.location_id})}
        />
      ))}
      <Title>My Reviews</Title>
      {reviews.map(
        (
          {
            review: {
              review_id,
              review_body,
              overall_rating,
              price_rating,
              quality_rating,
              clenliness_rating,
              likes,
            },
            location: {location_id},
          },
          index,
        ) => (
          <View key={index}>
            <Review
              details={{
                location_id,
                review_id,
                review_body,
                overall_rating,
                price_rating,
                quality_rating,
                clenliness_rating,
                likes,
              }}
              editable
              navigation={navigation}
              refreshReviews={refreshReviews}
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
