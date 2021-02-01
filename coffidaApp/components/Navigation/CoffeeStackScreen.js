import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Shop from '../CoffeeShop/Shop';
import AllShops from '../CoffeeShop/AllShops';

export default function CoffeeStackScreen() {
  const CoffeeStackScreen = createStackNavigator();

  return (
    <CoffeeStackScreen.Navigator>
      <CoffeeStackScreen.Screen
        name="AllShops"
        component={AllShops}
        options={{headerShown: false}}
      />
      <CoffeeStackScreen.Screen name="Shop" component={Shop} />
    </CoffeeStackScreen.Navigator>
  );
}
