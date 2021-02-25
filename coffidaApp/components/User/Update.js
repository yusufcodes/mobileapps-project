import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {
  Title,
  TextInput,
  Paragraph,
  HelperText,
  Button,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import Button from '../Global/Button';
import showToast from '../../functions/showToast';
import updateUser from '../../functions/network/updateUser';
import checkValidEmail from '../../functions/checkValidEmail';
import checkValidPassword from '../../functions/checkValidPassword';

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  heading: {
    textAlign: 'center',
  },
});

// TODO: Disable button if details are not valid
export default function Update({route}) {
  const globalNavigation = useNavigation();
  const {
    firstName: firstNameParam,
    lastName: lastNameParam,
    email: emailParam,
  } = route.params.details;

  const [firstName, setFirstName] = useState(firstNameParam);
  const [lastName, setLastName] = useState(lastNameParam);
  const [email, setEmail] = useState(emailParam);
  const [validEmail, setValidEmail] = React.useState(true);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = React.useState(true);

  useEffect(() => {
    checkValidEmail(email, setValidEmail);
    checkValidPassword(password, setValidPassword);
  }, [email, password]);

  const updateHandler = async () => {
    Keyboard.dismiss();

    // Constructing data for PATCH request based on the data that the user changes
    const data = {};

    if (firstName !== firstNameParam) {
      data.first_name = firstName;
    }
    if (lastName !== lastNameParam) {
      data.last_name = lastName;
    }
    if (email !== emailParam) {
      data.email = email;
    }
    if (password.length > 0) {
      data.password = password;
    }

    const response = await updateUser(data);
    if (response?.status === 200) {
      showToast('Details successfully updated!');
      globalNavigation.goBack();
    } else {
      showToast('Oops, we ran into an issue here. Please try again.');
    }
  };
  return (
    <View style={styles.root}>
      <Title style={styles.heading}>Update Details</Title>
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
      {/* TODO: Disable button if details are not valid */}
      <Button
        uppercase
        accessibilityLabel="Confirming and submitting all entered details"
        mode="contained"
        disabled={!validEmail}
        onPress={() => updateHandler()}>
        Confirm Details
      </Button>
    </View>
  );
}
