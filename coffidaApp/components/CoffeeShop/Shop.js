import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {
  ActivityIndicator,
  Colors,
  Paragraph,
  Divider,
  Title,
} from 'react-native-paper';
import getToken from '../../functions/getToken';
import Heading from './Shop/Heading';
import LikeButton from '../Global/LikeButton';

const axios = require('axios');

export default function Shop({route}) {
  const {id} = route.params;
  const [shop, setShop] = useState();

  useEffect(() => {
    async function response() {
      const token = await getToken();
      try {
        const response = await axios({
          method: 'get',
          url: `http://10.0.2.2:3333/api/1.0.0/location/${id}`,
          responseType: 'json',
          headers: {'X-Authorization': token},
        });

        const {
          location_name: name,
          location_town: town,
          photo_path: photo,
          avg_overall_rating: overallRating,
          avg_price_rating: priceRating,
          avg_quality_rating: qualityRating,
          avg_clenliness_rating: cleanlinessRating,
          location_reviews: reviews,
        } = response.data;

        setShop({
          name,
          town,
          photo,
          overallRating,
          priceRating,
          qualityRating,
          cleanlinessRating,
          reviews,
        });
        console.log(`Retrieved single shop`);
        console.log('Reviews:');
        console.log(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    response();
  }, []);

  const handleLike = () => {
    console.log('Like button pressed');
  };

  const styles = StyleSheet.create({
    root: {},
    like: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  let renderShop = (
    <ActivityIndicator animating size="large" color={Colors.red800} />
  );

  if (shop) {
    renderShop = (
      <ScrollView style={styles.root}>
        <Heading details={shop} />
        <Title
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}>
          Reviews
        </Title>
        {shop.reviews.map(
          ({
            review_body,
            overall_rating,
            price_rating,
            quality_rating,
            clenliness_rating,
            likes,
          }) => (
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
          ),
        )}
      </ScrollView>
    );
  }
  return <View>{renderShop}</View>;
}
