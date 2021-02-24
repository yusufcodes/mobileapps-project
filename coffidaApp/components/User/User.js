import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Title,
  Subheading,
  Paragraph,
  List,
  Dialog,
  Portal,
  Button as DialogButton,
} from 'react-native-paper';
import Button from '../Global/Button';
import getUser from '../../functions/network/getUser';
import Review from '../CoffeeShop/Review';
import logout from '../../functions/network/logout';
import showToast from '../../functions/showToast';

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
  const globalNavigation = useNavigation();

  const [details, setDetails] = useState({});
  const [locations, setLocations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);
  const [loggedOut, setLoggedOut] = useState(false);
  const [errorLogOut, setErrorLogOut] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  const displayUpdate = () => navigation.navigate('Update', {details});

  // TODO: Error handling
  const refreshReviews = async () => {
    console.log('Refreshing reviews...');
    const response = await getUser();
    const {reviews} = response?.data;
    setReviews(reviews);
  };

  useEffect(() => {
    if (loggedOut) {
      console.log('User: User is now logged out, navigating...');
      hideDialog();
      globalNavigation.navigate('Sign Up');
    }
    if (errorLogOut) {
      showToast("Oops, we couldn't sign you out. Please try again.");
    }
  }, [loggedOut, errorLogOut]);

  useFocusEffect(
    React.useCallback(() => {
      (async function () {
        const response = await getUser();
        const {
          email,
          first_name,
          last_name,
          favourite_locations,
          liked_reviews,
          reviews,
        } = response?.data;
        setDetails({
          email,
          firstName: first_name,
          lastName: last_name,
        });
        setLocations(favourite_locations);
        setReviews(reviews);
        setLikedReviews(liked_reviews);
      })();
    }, []),
  );

  return (
    <ScrollView style={styles.root}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Are you sure you want to log out?</Dialog.Title>
          <Dialog.Actions>
            <DialogButton onPress={() => hideDialog()}>Cancel</DialogButton>
            <DialogButton
              onPress={() => {
                setLoggedOut(false);
                setErrorLogOut(false);
                logout(setLoggedOut, setErrorLogOut);
              }}>
              Yes
            </DialogButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Title style={styles.heading}>My Profile</Title>
      <View style={styles.details}>
        <Subheading>Personal Details</Subheading>

        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>First Name: </Paragraph>
          <Paragraph>{details?.firstName}</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Last Name: </Paragraph>
          <Paragraph>{details?.lastName}</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Email: </Paragraph>
          <Paragraph>{details?.email}</Paragraph>
        </View>
      </View>
      <Button text="Update Details" handler={displayUpdate} />
      <Button text="Logout" handler={showDialog} />
      <Title>My Liked Locations</Title>
      {locations.map((item, index) => (
        <List.Item
          key={index}
          title={`${item?.location_name}`}
          description={`Town: ${item?.location_town} \nRating: ${item?.avg_overall_rating}`}
          descriptionNumberOfLines={2}
          left={(props) => <List.Icon {...props} icon="coffee" />}
          onPress={() => navigation.navigate('Shop', {id: item?.location_id})}
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
