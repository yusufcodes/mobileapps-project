import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph, Divider} from 'react-native-paper';
import LikeButton from '../Global/LikeButton';
import getUser from '../../functions/network/getUser';
import getLocation from '../../functions/network/getLocation';
import likeReview from '../../functions/network/likeReview';
import showToast from '../../functions/showToast';

export default function Review({details}) {
  const {
    id: location_id,
    review_id,
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    likes,
  } = details;

  const [reviewLikes, setReviewLikes] = useState(likes);

  const styles = StyleSheet.create({
    root: {},
    like: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  const getLikes = async (reviewId) => {
    console.log('getLikes: Running...');
    const response = await getLocation(location_id);
    const {location_reviews: reviews} = response.data;
    const review = reviews.find(
      (currentReview) => currentReview.review_id === reviewId,
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
          <View style={styles.like}>
            <LikeButton handler={() => handleLike()} size={20} />
            <Paragraph>{reviewLikes}</Paragraph>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}
