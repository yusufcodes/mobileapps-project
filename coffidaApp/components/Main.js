import React from 'react';
import {View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllShops from './CoffeeShop/AllShops';
import CoffeeStackScreen from './Navigation/CoffeeStackScreen';
import UserStackScreen from './Navigation/UserStackScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Coffee"
        component={CoffeeStackScreen}
        options={{
          tabBarIcon: ({color, size = 20}) => (
            <MaterialCommunityIcons
              name="coffee-to-go"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size = 20}) => (
            <MaterialCommunityIcons
              name="badge-account"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
