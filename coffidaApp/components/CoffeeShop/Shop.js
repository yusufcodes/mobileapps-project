import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import getToken from '../../functions/getToken';
import Heading from './Shop/Heading';

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
      } catch (error) {
        console.log(error);
      }
    }

    response();
  }, []);

  let renderShop = (
    <ActivityIndicator animating size="large" color={Colors.red800} />
  );

  if (shop) {
    renderShop = (
      <View>
        <Heading details={shop} />
      </View>
    );
  }
  return <View>{renderShop}</View>;
}
