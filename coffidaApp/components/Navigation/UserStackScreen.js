import React from 'react';
import {Button, IconButton} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import User from '../User/User';
import Update from '../User/Update';
import SignUp from '../User/SignUp';
import EditReview from '../CoffeeShop/EditReview';

export default function UserStackScreen() {
  const UserStackScreen = createStackNavigator();

  return (
    <UserStackScreen.Navigator>
      <UserStackScreen.Screen
        name="User"
        component={User}
        options={{
          headerRight: () => (
            <IconButton icon="logout" size={20} color="#000" />
          ),
        }}
      />
      <UserStackScreen.Screen name="Update" component={Update} />
      <UserStackScreen.Screen name="EditReview" component={EditReview} />
      <UserStackScreen.Screen
        name="SignUp"
        component={SignUp}
        options={{tabBarVisible: false}}
      />
    </UserStackScreen.Navigator>
  );
}
