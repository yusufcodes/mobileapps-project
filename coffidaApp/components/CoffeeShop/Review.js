import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import RNFS from 'react-native-fs';
import {Paragraph, Divider, Dialog, Portal, Button} from 'react-native-paper';
import LikeButton from '../Global/LikeButton';
import EditButton from '../Global/EditButton';
import DeleteButton from '../Global/DeleteButton';
import getUser from '../../functions/network/getUser';
import getLocation from '../../functions/network/getLocation';
import likeReview from '../../functions/network/likeReview';
import deleteReview from '../../functions/network/deleteReview';
import getPhotoReview from '../../functions/network/getPhotoReview';
import photoReview from '../../functions/network/photoReview';
import showToast from '../../functions/showToast';
import Star from '../Global/Star';

export default function Review({
  details,
  editable,
  navigation = false,
  refreshReviews = false,
}) {
  const {
    location_id,
    location_name,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    likes,
  } = details;

  const [serverPhoto, setServerPhoto] = useState(null);

  const getReviewPhoto = async () => {
    if (location_id && review_id) {
      const getPhoto = await getPhotoReview(location_id, review_id);
      if (getPhoto?.status === 200) {
        setServerPhoto(getPhoto.data);
      }
    }
  };

  useEffect(() => {
    (async function () {
      await getReviewPhoto();
    })();
  }, []);
  const [visible, setVisible] = React.useState(false);
  const [visibleDialogPhoto, setVisibleDialogPhoto] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const showDialogPhoto = () => setVisibleDialogPhoto(true);
  const hideDialogPhoto = () => setVisibleDialogPhoto(false);

  const [reviewLikes, setReviewLikes] = useState(likes);

  const getLikes = async () => {
    console.log('getLikes: Running...');
    const response = await getLocation(location_id);
    const {location_reviews: reviews} = response?.data;
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

  const performLike = async (location_id, review_id, unlike = false) => {
    const response = await likeReview(location_id, review_id, unlike);
    if (!response || response.status !== 200) {
      showToast('Review could not be liked/unliked. Please try again.');
      return;
    }
    showToast(`Review has been ${unlike ? 'unliked' : 'liked'}`);
  };

  const handleLike = async () => {
    console.log('Running handleLike...');

    const userDetails = await getUser();
    if (!userDetails) {
      showToast('Review could not be liked/unliked. Please try again.');
      return;
    }

    const {liked_reviews} = userDetails.data;

    // Empty liked reviews: no need to check if review exists
    if (liked_reviews.length === 0) {
      await performLike(location_id, review_id);
    } else {
      // Check if review to be liked has already been liked, determine like or unlike action
      const review = liked_reviews.find(
        (currentReview) => currentReview.review.review_id === review_id,
      );

      if (review) {
        const unlike = true;
        await performLike(location_id, review_id, unlike);
      } else {
        await performLike(location_id, review_id);
      }
    }

    const newLikes = await getLikes(review_id);
    setReviewLikes(newLikes);
  };

  const handleEdit = () => {
    console.log('handleEdit: Running...');
    console.log(location_id);
    navigation.navigate('EditReview', {
      location_id,
      location_name,
      review_id,
      review_body,
      overall_rating,
      price_rating,
      quality_rating,
      clenliness_rating,
      serverPhoto,
    });
  };

  const handleDelete = async () => {
    hideDialog();
    const response = await deleteReview(location_id, review_id);
    if (!response || response.status !== 200) {
      showToast("Oops, we couldn't delete this review. Please try again");
      return;
    }

    showToast('Review Deleted');
    await refreshReviews();
  };

  const deletePhotoFile = () => RNFS.unlink(serverPhoto?.uri);

  const handleDeletePhoto = async () => {
    hideDialogPhoto();
    console.log('deleting photo...');
    const deletePhoto = true;
    const response = await photoReview(location_id, review_id, deletePhoto);
    if (response?.status === 200) {
      console.log('Review: Photo successfully deleted');
      console.log(serverPhoto.uri);
      deletePhotoFile();
      await refreshReviews();
      await getReviewPhoto();
      console.log('Review: Reloaded everything!');
    } else {
      console.log('Error deleting the photo');
    }
  };

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
    reviewBody: {
      width: '65%',
    },
    like: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 150,
      height: 150,
      marginLeft: 10,
      marginBottom: 10,
    },
    starDetails: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  });

  const ReviewRatings = () => (
    <>
      <View style={styles.starDetails}>
        <Paragraph>Overall: </Paragraph>
        <Star
          rating={Math.floor(overall_rating)}
          starSize={10}
          starMargin={0}
          disabled
        />
      </View>
      <View style={styles.starDetails}>
        <Paragraph>Price: </Paragraph>
        <Star
          rating={Math.floor(price_rating)}
          starSize={10}
          starMargin={0}
          disabled
        />
      </View>
      <View style={styles.starDetails}>
        <Paragraph>Quality: </Paragraph>
        <Star
          rating={Math.floor(quality_rating)}
          starSize={10}
          starMargin={0}
          disabled
        />
      </View>
      <View style={styles.starDetails}>
        <Paragraph>Cleanliness: </Paragraph>
        <Star
          rating={Math.floor(clenliness_rating)}
          starSize={10}
          starMargin={0}
          disabled
        />
      </View>
    </>
  );

  return (
    <View>
      <View style={styles.root}>
        <Paragraph style={styles.reviewBody}>💬 {review_body}</Paragraph>
        <View>
          <ReviewRatings />
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
                        <Button
                          accessibilityLabel="Cancel action"
                          accessibilityHint="Stops action of deleting this review"
                          accessibilityRole="button"
                          onPress={hideDialog}>
                          Cancel
                        </Button>
                        <Button
                          accessibilityLabel="OK to delete review"
                          accessibilityHint="Confirm action to delete this review"
                          accessibilityRole="button"
                          onPress={handleDelete}>
                          OK
                        </Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        {serverPhoto ? (
          <Image
            accessibilityLabel="Image that is associated with this review"
            source={{uri: serverPhoto?.uri}}
            style={styles.image}
          />
        ) : null}
        {editable && serverPhoto ? (
          <View>
            <DeleteButton handler={() => showDialogPhoto()} size={20} />
            <Portal>
              <Dialog visible={visibleDialogPhoto} onDismiss={hideDialogPhoto}>
                <Dialog.Title>Delete Photo from Review</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>
                    Are you sure you want to delete this photo?
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    accessibilityLabel="Cancel action"
                    accessibilityHint="Stops action of deleting this photo"
                    accessibilityRole="button"
                    onPress={hideDialogPhoto}>
                    Cancel
                  </Button>
                  <Button
                    accessibilityLabel="OK to delete photo"
                    accessibilityHint="Confirm action to delete this photo"
                    accessibilityRole="button"
                    onPress={handleDeletePhoto}>
                    OK
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        ) : null}
      </View>
      <Divider style={{borderWidth: 0.2}} />
    </View>
  );
}
