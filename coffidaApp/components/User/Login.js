import React, {useEffect} from 'react';
import {View, Keyboard} from 'react-native';
import {
  TextInput,
  Headline,
  Subheading,
  Button,
  HelperText,
} from 'react-native-paper';
import showToast from '../../functions/showToast';
import checkValidEmail from '../../functions/checkValidEmail';
import checkValidPassword from '../../functions/checkValidPassword';
import login from '../../functions/network/login';
import commonStyles from '../../styles/commonStyles';

export default function Login({navigation}) {
  // State for user input
  const [email, setEmail] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(true);
  const [password, setPassword] = React.useState('');

  // State for error handling
  const [validPassword, setValidPassword] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [invalidLogin, setInvalidLogin] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);

  // Perform input checks each time the user enters either their email or password
  useEffect(() => {
    checkValidEmail(email, setValidEmail);
    checkValidPassword(password, setValidPassword);
  }, [email, password]);

  // Listen for changes in boolean values for logging in + display relevant toast
  useEffect(() => {
    if (loggedIn) {
      showToast('Login successful');
      navigation.navigate('Main');
    }
    if (invalidLogin) {
      showToast('Incorrect email / password supplied, please try again.');
    }
    if (loginError) {
      showToast(
        'Oops, looks like there was an issue logging you in. Please try again.',
      );
    }
  }, [loggedIn, loginError, invalidLogin]);

  const performLogin = async () => {
    Keyboard.dismiss();
    setLoginError(false);
    setInvalidLogin(false);
    setLoggedIn(false);
    await login(email, password, setLoggedIn, setLoginError, setInvalidLogin);
  };

  return (
    <>
      <View style={commonStyles.root}>
        <Headline>Log In</Headline>
        <Subheading>
          Use your log in details to start using the Coffida app
        </Subheading>
        <TextInput
          style={commonStyles.inputSpacing}
          label="Email"
          value={email}
          mode="outlined"
          error={!validEmail && email.length > 0}
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
        <Button
          style={commonStyles.buttonSpacing}
          uppercase
          accessibilityLabel="Log in"
          accessibilityHint="Use the login details entered to try and sign into your account"
          accessibilityRole="button"
          mode="contained"
          disabled={!validEmail || !validPassword}
          onPress={() => performLogin()}>
          Log In
        </Button>
      </View>
    </>
  );
}
