import React from 'react';
import {View} from 'react-native';
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
