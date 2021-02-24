import React from 'react';
import {IconButton, Dialog, Portal, Button} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import User from '../User/User';
import Update from '../User/Update';
import EditReview from '../CoffeeShop/EditReview';

export default function UserStackScreen() {
  const UserStackScreen = createStackNavigator();

  const handleLogout = () => {
    /*
    1. Show dialog: "Are you sure you want to log out?"
    2. Options: Cancel Yes
    3. Press Yes -> perform logout
    4. Press Cancel -> Hide Dialog
    
    */
  };

  return (
    <UserStackScreen.Navigator>
      <UserStackScreen.Screen name="User" component={User} />
      <UserStackScreen.Screen name="Update" component={Update} />
      <UserStackScreen.Screen name="EditReview" component={EditReview} />
    </UserStackScreen.Navigator>
  );
}
