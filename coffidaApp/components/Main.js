import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoffeeStackScreen from './Navigation/CoffeeStackScreen';
import UserStackScreen from './Navigation/UserStackScreen';
import Test from '../components/User/Test';

const Tab = createMaterialBottomTabNavigator();
// const Stack = createStackNavigator();

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
      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}
