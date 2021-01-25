/* eslint-disable react/prop-types */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';

const styles = StyleSheet.create({});
const Stack = createStackNavigator();

// eslint-disable-next-line react/prop-types
const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;
