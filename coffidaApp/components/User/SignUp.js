import React, {useEffect} from 'react';
import {View, StyleSheet, ToastAndroid, Keyboard} from 'react-native';
import {
  TextInput,
  Headline,
  Subheading,
  Button,
  HelperText,
} from 'react-native-paper';
import showToast from '../../functions/showToast';
import createUser from '../../functions/network/createUser';

export default function SignUp({navigation}) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [validPassword, setValidPassword] = React.useState(true);
  const [accountCreated, setAccountCreated] = React.useState(false);

  const performCreateUser = async () => {
    Keyboard.dismiss();
    // Validation inside this file ?
    await createUser(firstName, lastName, email, password, setAccountCreated);
  };

  // Perform regex
  const checkValidEmail = (email) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (valid) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const checkValidPassword = (password) => {
    const valid = password.length > 5;
    if (valid) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  useEffect(() => {
    checkValidEmail(email);
    checkValidPassword(password);
  }, [email, password]);

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
        // error={firstName.length < 2}
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      {/* <HelperText type="error" visible={firstName.length < 2}>
        Please enter your first name
      </HelperText> */}
      <TextInput
        label="Last Name"
        value={lastName}
        mode="outlined"
        // error={lastName.length < 2}
        onChangeText={(lastName) => setLastName(lastName)}
      />
      {/* <HelperText type="error" visible={lastName.length < 2}>
        Please enter your last name
      </HelperText> */}
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        error={!validEmail && email.length > 0}
        onChangeText={(email) => {
          setEmail(email);
        }}
      />
      <HelperText type="error" visible={!validEmail && email.length > 0}>
        Please enter a valid email address
      </HelperText>
      {/* Validation */}
      <TextInput
        secureTextEntry
        label="Password"
        value={password}
        mode="outlined"
        error={!validPassword && password.length > 0}
        onChangeText={(password) => setPassword(password)}
      />
      <HelperText type="error" visible={!validPassword && password.length > 0}>
        Please enter a password with more than five characters
      </HelperText>
      <Button
        uppercase
        accessibilityLabel="Sign up for an account"
        mode="contained"
        disabled={
          !validEmail ||
          !validPassword ||
          firstName.length < 2 ||
          lastName.length < 2
        }
        onPress={() => performCreateUser()}>
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
          navigation.navigate('Log In');
        }}>
        Login
      </Button>
    </View>
  );
}
