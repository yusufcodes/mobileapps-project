import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Headline,
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
import commonStyles from '../../styles/commonStyles';

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
        setLoadingDetails(false);
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
        showToast('Loading details...');
        const response = await performGetUser();

        if (!response) {
          showToast("Sorry, we couldn't fetch your details. Please try again.");
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
    console.log('Refreshing reviews...');
    showToast('Refreshing Reviews...');
    const response = await performGetUser();
    const {reviews} = response?.data;
    setReviews(reviews);
  };

  const styles = StyleSheet.create({
    singleDetail: {
      flexDirection: 'row',
    },
  });

  const noLikedLocations = () => {
    if (loadingDetails) {
      return <Loader size="small" />;
    }
    return <Paragraph>You haven't liked any locations</Paragraph>;
  };
  const noReviews = () => {
    if (loadingDetails) {
      return <Loader size="small" />;
    }
    return <Paragraph>You haven't posted any reviews yet</Paragraph>;
  };
  const noFavourites = () => {
    if (loadingDetails) {
      return <Loader size="small" />;
    }
    return <Paragraph>You haven't favourited any reviews yet</Paragraph>;
  };

  return (
    <ScrollView>
      <View style={commonStyles.scrollViewMargin}>
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
        <Headline style={styles.heading}>My Profile</Headline>
        <View style={styles.details}>
          <Title>Personal Details</Title>
          {details ? (
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
        <View style={commonStyles.buttonGroup}>
          <Button
            accessibilityLabel="Update user details"
            accessibilityHint="Navigate to the screen where you can enter any details you want to update"
            accessibilityRole="button"
            text="Update Details"
            handler={displayUpdate}
          />
          <Button
            accessibilityLabel="Logout"
            accessibilityHint="Display a dialog which will prompt whether you would like to log out of your account"
            accessibilityRole="button"
            text="Logout"
            handler={showLogoutDialog}
          />
        </View>
        <Title>My Liked Locations</Title>
        {locations
          ? locations.map((item, index) => (
              <List.Item
                key={index}
                title={`${item?.location_name}`}
                description={`Town: ${item?.location_town} \nRating: ${item?.avg_overall_rating}`}
                descriptionNumberOfLines={2}
                left={(props) => <List.Icon {...props} icon="coffee" />}
                onPress={() =>
                  navigation.navigate('Shop', {id: item?.location_id})
                }
              />
            ))
          : noLikedLocations()}

        <Title>My Reviews</Title>
        {reviews
          ? reviews.map(
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
                  location: {location_id, location_name},
                },
                index,
              ) => (
                <View key={index}>
                  <Review
                    details={{
                      location_id,
                      location_name,
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
          : noReviews()}

        <Title>My Liked Reviews</Title>
        {likedReviews
          ? likedReviews.map(
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
          : noFavourites()}
      </View>
    </ScrollView>
  );
}
