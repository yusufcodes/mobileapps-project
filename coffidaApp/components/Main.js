import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AllShops from './CoffeeShop/AllShops';
import CoffeeStackScreen from './Navigation/CoffeeStackScreen';
import UserStackScreen from './Navigation/UserStackScreen';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Coffee" component={CoffeeStackScreen} />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
