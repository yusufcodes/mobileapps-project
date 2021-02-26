import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperTheme,
} from 'react-native-paper';
import SignUp from './components/User/SignUp';
import Login from './components/User/Login';
import Main from './components/Main';

const Stack = createStackNavigator();

const theme = {
  ...PaperTheme,
  roundness: 2,
  colors: {
    ...PaperTheme.colors,
    primary: '#53433A',
    accent: '#f1c40f', // secondary
    // background:
    // surface:
    text: '#2a150d',
    // disabled:
    // placeholder:
    // backdrop:
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9B4949',
    background: '#F4F3EF',
    card: '#9B4949',
    text: 'white',
    // border: 'green',
  },
};

const App = () => (
  <PaperProvider theme={theme}>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Log In" component={Login} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

export default App;
