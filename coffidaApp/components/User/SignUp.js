import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';

export default function SignUp() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
        }}>
        Login
      </Button>
    </View>
  );
}
