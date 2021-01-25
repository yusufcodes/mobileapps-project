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

const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign Up">
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Log In" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;
