import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Paragraph, Divider} from 'react-native-paper';
import LikeButton from '../Global/LikeButton';

export default function Review({details}) {
  const {
    review_body,
    overall_rating,
    price_rating,
    quality_rating,
    clenliness_rating,
    likes,
  } = details;
  const styles = StyleSheet.create({
    root: {},
    like: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  const handleLike = () => {
    console.log('Like button pressed');
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
            <LikeButton handler={handleLike} size={20} />
            <Paragraph>{likes}</Paragraph>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
}
