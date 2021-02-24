import React, {useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
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
  const [signupError, setSignupError] = React.useState(false);

  const performCreateUser = async () => {
    Keyboard.dismiss();
    setSignupError(false);
    await createUser(
      firstName,
      lastName,
      email,
      password,
      setAccountCreated,
      setSignupError,
    );
  };

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

  // Perform input checks each time the user enters either their email or password
  useEffect(() => {
    checkValidEmail(email);
    checkValidPassword(password);
  }, [email, password]);

  // Listen for changes in boolean values for creating an account + display relevant toast
  useEffect(() => {
    if (accountCreated) {
      showToast('Account successfully created');
    }
    if (signupError) {
      showToast(
        'Oops, looks like there was an issue making your account. Please try again.',
      );
    }
  }, [accountCreated, signupError]);

  // TODO: Styles
  const styles = StyleSheet.create({
    container: {
      padding: 50,
    },
  });

  // Conditionally rendering button output depending on if the user created an account
  const renderButtons = () => {
    let components = (
      <>
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
          Create Account
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
      </>
    );
    if (accountCreated) {
      components = (
        <>
          <Subheading
            style={{
              textAlign: 'center',
            }}>
            Account created - proceed to login
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
        </>
      );
    }
    return components;
  };

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
        error={!validEmail && email.length > 0}
        onChangeText={(email) => {
          setEmail(email);
        }}
      />
      <HelperText type="error" visible={!validEmail && email.length > 0}>
        Please enter a valid email address
      </HelperText>
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
      {renderButtons()}
    </View>
  );
}
