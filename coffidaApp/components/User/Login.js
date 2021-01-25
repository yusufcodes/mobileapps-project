import React from 'react';
import {View, Text, StyleSheet, ToastAndroid, Keyboard} from 'react-native';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';
import showToast from '../../functions/showToast';
import storeData from '../../functions/storeData';

const axios = require('axios');

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      padding: 50,
    },
  });

  const login = async () => {
    Keyboard.dismiss();
    const response = await axios
      .post('http://10.0.2.2:3333/api/1.0.0/user/login', {
        email,
        password,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            console.log('login: Login Successful');
            storeData('token', response.data.token);
            showToast('Login Successful!');
            setLoggedIn(true);
          }
        },
        (error) => {
          showToast('Incorrect email or password, please try again.');
          console.log(`login: Error - ${error}`);
        },
      );
  };

  return (
    <View style={styles.container}>
      <Headline>Log In</Headline>
      <Subheading>
        Use your log in details to start using the Coffida app
      </Subheading>
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
        accessibilityLabel="Log in to an existing account"
        mode="outlined"
        onPress={() => login()}>
        Log In
      </Button>
      {loggedIn ? (
        <Subheading>
          Login successful - ready to move into the main app!
        </Subheading>
      ) : null}
    </View>
  );
}
