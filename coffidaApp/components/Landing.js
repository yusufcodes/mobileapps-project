import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import getToken from '../functions/getToken';
import AllShops from './CoffeeShop/AllShops';
import Search from './CoffeeShop/Search';

export default function Landing({navigation}) {
  return (
    <View>
      <Search />
      <AllShops navigation={navigation} />
    </View>
  );
}
