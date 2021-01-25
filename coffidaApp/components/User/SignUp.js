/* eslint-disable react/prop-types */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const axios = require('axios');

export default function SignUp({navigation}) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    axios
      .get('http://10.0.2.2:3333/api/1.0.0/user/9')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    return () => {
      // cleanup
    };
  });

  const styles = StyleSheet.create({
    container: {
      padding: 50,
    },
  });

  return (
    <View style={styles.container}>
      <Headline>Sign Up</Headline>
      <Subheading>
        Sign up for an account to begin using the Coffida app 👋
      </Subheading>
      <TextInput
        label="Name"
        value={name}
        mode="outlined"
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        secureTextEntry
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        uppercase
        accessibilityLabel="Sign up for an account"
        mode="outlined"
        onPress={() => {
          console.log('Sign up: pressed');
        }}>
        Sign up
      </Button>
      <Subheading>Already have an account? Login ⬇️</Subheading>
      <Button
        uppercase
        accessibilityLabel="Login to existing account"
        mode="outlined"
        onPress={() => {
          console.log('Login: pressed');
          navigation.navigate('Login');
        }}>
        Login
      </Button>
    </View>
  );
}
