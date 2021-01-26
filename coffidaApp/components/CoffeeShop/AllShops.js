import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {List} from 'react-native-paper';

import getToken from '../../functions/getToken';

const axios = require('axios');

export default function AllShops({navigation}) {
  // Storing token in state to be referenced later
  const [token, setToken] = useState('');
  // Storing details of each shop to output to the user
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Assigning token value to state once the Promise from 'value' is resolved
    const setTokenState = async () => {
      const value = await getToken();
      setToken(value);
    };

    async function response() {
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
        setShops(arrayOfShops);
      } catch (error) {
        console.log(error);
      }
    }

    setTokenState();
    response();
  }, []);

  return (
    <View>
      {shops?.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.name}`}
          description={`Town: ${item.town} \nRating: ${item.rating}`}
          descriptionNumberOfLines={2}
          left={(props) => <List.Icon {...props} icon="coffee" />}
        />
      ))}
    </View>
  );
}
