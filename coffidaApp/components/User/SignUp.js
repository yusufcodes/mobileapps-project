import React, {useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {
  TextInput,
  Headline,
  Subheading,
  Caption,
  Button,
  Paragraph,
  HelperText,
} from 'react-native-paper';
import showToast from '../../functions/showToast';
import createUser from '../../functions/network/createUser';
import checkValidEmail from '../../functions/checkValidEmail';
import checkValidPassword from '../../functions/checkValidPassword';
import commonStyles from '../../styles/commonStyles';

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

  // Perform input checks each time the user enters either their email or password
  useEffect(() => {
    checkValidEmail(email, setValidEmail);
    checkValidPassword(password, setValidPassword);
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
    title: {
      textAlign: 'center',
    },
  });

  // Conditionally rendering button output depending on if the user created an account
  const renderButtons = () => {
    let components = (
      <>
        <Button
          style={commonStyles.buttonSpacing}
          uppercase
          accessibilityLabel="Create a new account"
          accessibilityHint="Uses your details to create a new account for Coffida"
          accessibilityRole="button"
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
          style={commonStyles.buttonSpacing}
          uppercase
          accessibilityLabel="Navigate to log in"
          accessibilityHint="Changing screen to enable logging into existing account"
          accessibilityRole="button"
          mode="contained"
          onPress={() => {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setAccountCreated(false);
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
            accessibilityLabel="Navigate to log in"
            accessibilityHint="Changing screen to enable logging into existing account"
            accessibilityRole="button"
            mode="contained"
            onPress={() => {
              setFirstName('');
              setLastName('');
              setEmail('');
              setPassword('');
              setAccountCreated(false);
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
      <Headline style={[commonStyles.headlineLogo, styles.title]}>
        Coffida App
      </Headline>
      <Headline>Sign Up</Headline>
      <Paragraph>
        Sign up for an account to begin using the Coffida app 👋
      </Paragraph>
      <TextInput
        style={commonStyles.inputSpacing}
        label="First Name"
        value={firstName}
        mode="outlined"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        style={commonStyles.inputSpacing}
        label="Last Name"
        value={lastName}
        mode="outlined"
        onChangeText={(lastName) => setLastName(lastName)}
      />

      <TextInput
        style={commonStyles.inputSpacing}
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={(email) => {
          setEmail(email);
        }}
      />
      {!validEmail && email.length > 0 ? (
        <HelperText type="error" visible={!validEmail && email.length > 0}>
          Please enter a valid email address
        </HelperText>
      ) : null}

      <TextInput
        style={commonStyles.inputSpacing}
        secureTextEntry
        label="Password"
        value={password}
        mode="outlined"
        error={!validPassword && password.length > 0}
        onChangeText={(password) => setPassword(password)}
      />
      {!validPassword && password.length > 0 ? (
        <HelperText
          type="error"
          visible={!validPassword && password.length > 0}>
          Please enter a password with more than five characters
        </HelperText>
      ) : null}

      {renderButtons()}
    </View>
  );
}
