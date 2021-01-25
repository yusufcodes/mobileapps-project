import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const axios = require('axios');

export default function AllShops() {
  useEffect(() => {
    async function response() {
      try {
        //   const response = await axios.get('http://10.0.2.2:3333/api/1.0.0/find', headers: {'X-Authorization': 'b2c4070f584a41e55f5b93437b1857a5'});
        const response = await axios({
          method: 'get',
          url: 'http://10.0.2.2:3333/api/1.0.0/find',
          responseType: 'json',
          headers: {'X-Authorization': 'b2c4070f584a41e55f5b93437b1857a5'},
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    response();
  });
  return (
    <View>
      <Text>all Shops</Text>
    </View>
  );
}
