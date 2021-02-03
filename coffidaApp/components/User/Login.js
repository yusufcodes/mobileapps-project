import React from 'react';
import {View, Text, StyleSheet, ToastAndroid, Keyboard} from 'react-native';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';
import showToast from '../../functions/showToast';
import storeData from '../../functions/storeData';

const axios = require('axios');

export default function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
            storeData('token', response.data.token);
            storeData('id', response.data.id.toString());
            showToast('Login Successful!');
            navigation.navigate('Main');
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
        mode="contained"
        onPress={() => login()}>
        Log In
      </Button>
    </View>
  );
}
