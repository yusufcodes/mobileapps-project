import React from 'react';
import {View, StyleSheet, ToastAndroid, Keyboard} from 'react-native';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';
import showToast from '../../functions/showToast';

const axios = require('axios');

export default function SignUp({navigation}) {
  navigation.setOptions({tabBarVisible: false});
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [accountCreated, setAccountCreated] = React.useState(false);

  const createUser = async () => {
    Keyboard.dismiss();
    const response = await axios
      .post('http://10.0.2.2:3333/api/1.0.0/user', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      .then(
        (response) => {
          //   console.log(response.data); // {"id": 24}
          //   console.log(response.status); // 201
          //   console.log(response.statusText);
          //   console.log(response.headers);
          //   console.log(response.config);
          // },
          if (response.status === 201) {
            // Display Toast to the user
            showToast(
              `${firstName}, your account has successfully been created!`,
            );
            setAccountCreated(true);
          }
        },
        (error) => {
          console.log(error);
        },
      );
  };

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
        label="First Name"
        value={firstName}
        mode="outlined"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        mode="outlined"
        onChangeText={(lastName) => setLastName(lastName)}
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
        mode="contained"
        onPress={() => createUser()}>
        Sign up
      </Button>
      <Subheading
        style={{
          textAlign: 'center',
        }}>
        Already have an account?
      </Subheading>
      <Button
        uppercase
        accessibilityLabel="Login to existing account"
        mode="contained"
        onPress={() => {
          console.log('Login: pressed');
          navigation.navigate('Log In');
        }}>
        Login
      </Button>
    </View>
  );
}
