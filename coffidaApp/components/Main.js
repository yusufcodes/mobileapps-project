import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoffeeStackScreen from './Navigation/CoffeeStackScreen';
import UserStackScreen from './Navigation/UserStackScreen';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Coffee"
        component={CoffeeStackScreen}
        // ESLint Warning: Wasn't sure how to fix this here so left it as it is.
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
