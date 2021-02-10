import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator, Colors, Title} from 'react-native-paper';
import Heading from './Shop/Heading';
import getLocation from '../../functions/network/getLocation';
import Review from './Review';

export default function Shop({route, navigation}) {
  const {id} = route.params;
  const [shop, setShop] = useState();

  const handleResponse = (response) => {
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
      id,
      name,
      town,
      photo,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      reviews,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      async function performRequest() {
        const response = await getLocation(id);
        handleResponse(response);
      }
      performRequest();
    }, []),
  );

  let renderShop = (
    <ActivityIndicator animating size="large" color={Colors.red800} />
  );

  if (shop) {
    renderShop = (
      <ScrollView>
        <Heading details={shop} navigation={navigation} id={id} />
        <Title
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}>
          Reviews
        </Title>
        {shop.reviews.map(
          (
            {
              review_id,
              review_body,
              overall_rating,
              price_rating,
              quality_rating,
              clenliness_rating,
              likes,
            },
            index,
          ) => (
            <View key={index}>
              <Review
                details={{
                  id,
                  review_id,
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
  return <View>{renderShop}</View>;
}
