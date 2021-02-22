import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph, Divider, Dialog, Portal, Button} from 'react-native-paper';
import LikeButton from '../Global/LikeButton';
import EditButton from '../Global/EditButton';
import DeleteButton from '../Global/DeleteButton';
// import Dialog from '../Global/Dialog';
import getUser from '../../functions/network/getUser';
import getLocation from '../../functions/network/getLocation';
import likeReview from '../../functions/network/likeReview';
import deleteReview from '../../functions/network/deleteReview';
import showToast from '../../functions/showToast';

let renders = 0;

export default function Review({
  details,
  editable,
  navigation = false,
  refreshReviews = false,
}) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const {
    location_id,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    likes,
  } = details;

  const [reviewLikes, setReviewLikes] = useState(likes);

  const getLikes = async () => {
    console.log('getLikes: Running...');
    const response = await getLocation(location_id);
    const {location_reviews: reviews} = response.data;
    const review = reviews.find(
      (currentReview) => currentReview.review_id === review_id,
    );
    if (!review) {
      console.log('getLikes: Unable to find review...');
      return null;
    }
    console.log('getLikes: New likes retrieved!');
    return review.likes;
  };

  const handleLike = async () => {
    console.log('Running handleLike...');

    // Get user info (get request)
    const userDetails = await getUser();

    // Retrieve list of liked reviews
    const {liked_reviews} = userDetails.data;

    // Empty liked reviews: no need to check if review exists
    if (liked_reviews.length === 0) {
      await likeReview(location_id, review_id);
      showToast('Success: review has been liked');
    } else {
      // Check if review to be liked has already been liked, determine like or unlike action
      const review = liked_reviews.find(
        (currentReview) => currentReview.review.review_id === review_id,
      );

      // Unlike the review (removed from liked_reviews)
      if (review) {
        const unlike = true;
        await likeReview(location_id, review_id, unlike);
        showToast('Success: review has been unliked');
      } else {
        // Like the review (add to liked_reviews)
        await likeReview(location_id, review_id);
        showToast('Success: review has been liked');
      }
    }

    const newLikes = await getLikes(review_id);
    console.log(newLikes);
    setReviewLikes(newLikes);
  };

  const handleEdit = () => {
    console.log('handleEdit: Running...');
    console.log(location_id);
    // navigate to Edit Review Page
    // what do I need:
    // current data for current review (props)
    navigation.navigate('EditReview', {
      location_id,
      review_id,
      review_body,
      overall_rating,
      price_rating,
      quality_rating,
      clenliness_rating,
    });
  };

  const handleDelete = async () => {
    const performDelete = await deleteReview(location_id, review_id);
    if (performDelete) {
      console.log('Review: Performing refreshReviews...');
      await refreshReviews();
      hideDialog();
      showToast('Success: Review Deleted');
    } else {
      console.log('Delete failed?');
    }
  };

  const styles = StyleSheet.create({
    like: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Paragraph
          style={{
            width: '70%',
          }}>
          {review_body}
        </Paragraph>
        <View>
          <Paragraph>
            {`Overall: ${overall_rating}/5 \nPrice: ${price_rating}/5 \nQuality: ${quality_rating}/5  \nCleanliness: ${clenliness_rating}/5`}
          </Paragraph>
          <View style={styles.buttons}>
            <View style={styles.like}>
              <LikeButton handler={() => handleLike()} size={20} />
              <Paragraph>{reviewLikes}</Paragraph>
            </View>
            {editable ? (
              <>
                <View>
                  <EditButton handler={() => handleEdit()} size={20} />
                </View>
                <View>
                  <DeleteButton handler={() => showDialog()} size={20} />
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Delete Review</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>
                          Are you sure you want to delete this review?
                        </Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={handleDelete}>OK</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}
