import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {List, ActivityIndicator, Colors} from 'react-native-paper';
import getToken from '../../functions/getToken';

const axios = require('axios');

export default function AllShops({navigation}) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function response() {
      const token = await getToken();
      try {
        const response = await axios({
          method: 'get',
          url: 'http://10.0.2.2:3333/api/1.0.0/find',
          responseType: 'json',
          headers: {'X-Authorization': token},
        });

        const arrayOfShops = response.data.map((item, index) => ({
          id: item.location_id,
          name: item.location_name,
          town: item.location_town,
          rating: item.avg_overall_rating,
        }));
        console.log('Got shops');
        setShops(arrayOfShops);
      } catch (error) {
        console.log(error);
      }
    }

    response();
  }, []);

  let listOfShops = (
    <ActivityIndicator animating size="large" color={Colors.red800} />
  );

  if (shops.length > 0) {
    listOfShops = shops?.map((item, index) => (
      <List.Item
        key={index}
        title={`${item.name}`}
        description={`Town: ${item.town} \nRating: ${item.rating}`}
        descriptionNumberOfLines={2}
        left={(props) => <List.Icon {...props} icon="coffee" />}
        onPress={() => navigation.navigate('Shop', {id: item.id})}
      />
    ));
  }

  return <View>{listOfShops}</View>;
}
