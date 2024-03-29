import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import User from '../User/User';
import Update from '../User/Update';
import EditReview from '../CoffeeShop/EditReview';

export default function UserStackScreen() {
  const UserStackScreen = createStackNavigator();

  return (
    <UserStackScreen.Navigator>
      <UserStackScreen.Screen name="User" component={User} />
      <UserStackScreen.Screen name="Update" component={Update} />
      <UserStackScreen.Screen name="EditReview" component={EditReview} />
    </UserStackScreen.Navigator>
  );
}
