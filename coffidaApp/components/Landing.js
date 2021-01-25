import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import getData from '../functions/getData';
import AllShops from './CoffeeShop/AllShops';

export default function Landing() {
  const [token, setToken] = useState('');
  useEffect(() => {});
  const getToken = getData().then((value) => {
    setToken(value);
    console.log(`Landing: value ${token}`);
  });

  return (
    <View>
      <Text>Landing</Text>
      <AllShops />
    </View>
  );
}
