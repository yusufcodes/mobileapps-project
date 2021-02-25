import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Title,
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
import Loader from '../Global/Loader';

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

// TODO: Use loading boolean for everything, not just user
export default function User({navigation}) {
  const globalNavigation = useNavigation();

  // State values storing user details
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [locations, setLocations] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [likedReviews, setLikedReviews] = useState(null);

  // State values related to authorisation
  const [loggedOut, setLoggedOut] = useState(false);
  const [errorLogOut, setErrorLogOut] = useState(false);

  // State values for log out dialog
  const [visible, setVisible] = React.useState(false);
  const hideLogoutDialog = () => setVisible(false);
  const showLogoutDialog = () => setVisible(true);

  const performGetUser = async () => {
    const response = await getUser();
    if (response?.status !== 200) {
      if (response?.status === 401) {
        console.log('User not logged in');
        globalNavigation.navigate('Sign Up');
      } else {
        showToast(
          "Sorry, we couldn't fetch your information. Please try refreshing this tab.",
        );
        return null;
      }
      return;
    }
    return response;
  };

  useEffect(() => {
    if (loggedOut) {
      console.log('User: User is now logged out, navigating...');
      hideLogoutDialog();
      globalNavigation.navigate('Sign Up');
    }
    if (errorLogOut) {
      showToast("Oops, we couldn't sign you out. Please try again.");
    }
  }, [loggedOut, errorLogOut]);

  useFocusEffect(
    React.useCallback(() => {
      (async function () {
        setLoadingDetails(true);
        const response = await performGetUser();

        if (!response) {
          return;
        }

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
        setLoadingDetails(false);
        setLocations(favourite_locations);
        setReviews(reviews);
        setLikedReviews(liked_reviews);
      })();
    }, []),
  );

  const displayUpdate = () => navigation.navigate('Update', {details});

  const refreshReviews = async () => {
    const response = await performGetUser();
    const {reviews} = response?.data;
    setReviews(reviews);
  };

  return (
    <ScrollView style={styles.root}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideLogoutDialog}>
          <Dialog.Title>Are you sure you want to log out?</Dialog.Title>
          <Dialog.Actions>
            <DialogButton onPress={() => hideLogoutDialog()}>
              Cancel
            </DialogButton>
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
        <Title>Personal Details</Title>
        {details && !loadingDetails ? (
          <>
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
          </>
        ) : (
          <Loader size="small" />
        )}
      </View>
      <Button text="Update Details" handler={displayUpdate} />
      <Button text="Logout" handler={showLogoutDialog} />
      <Title>My Liked Locations</Title>
      {locations && !loadingDetails ? (
        locations.map((item, index) => (
          <List.Item
            key={index}
            title={`${item?.location_name}`}
            description={`Town: ${item?.location_town} \nRating: ${item?.avg_overall_rating}`}
            descriptionNumberOfLines={2}
            left={(props) => <List.Icon {...props} icon="coffee" />}
            onPress={() => navigation.navigate('Shop', {id: item?.location_id})}
          />
        ))
      ) : (
        <Loader size="small" />
      )}

      <Title>My Reviews</Title>
      {reviews && !loadingDetails ? (
        reviews.map(
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
        )
      ) : (
        <Loader size="small" />
      )}

      <Title>My Liked Reviews</Title>
      {likedReviews && !loadingDetails ? (
        likedReviews.map(
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
        )
      ) : (
        <Loader size="small" />
      )}
    </ScrollView>
  );
}
