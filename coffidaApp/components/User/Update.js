import React, {useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Title, TextInput, Paragraph} from 'react-native-paper';
import Button from '../Global/Button';
import getToken from '../../functions/getToken';
import getId from '../../functions/getId';
import showToast from '../../functions/showToast';

const axios = require('axios');

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  heading: {
    textAlign: 'center',
  },
});

export default function Update({route}) {
  const {
    firstName: firstNameParam,
    lastName: lastNameParam,
    email: emailParam,
  } = route.params.details;
  const [firstName, setFirstName] = useState(firstNameParam);
  const [lastName, setLastName] = useState(lastNameParam);
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState('');

  const updateHandler = async () => {
    Keyboard.dismiss();
    const token = await getToken();
    const id = await getId();
    try {
      console.log(`Last name being submitted: ${lastName}`);
      const response = await axios({
        method: 'patch',
        url: `http://10.0.2.2:3333/api/1.0.0/user/${parseInt(id)}`,
        responseType: 'json',
        headers: {'X-Authorization': token},
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
      });
      if (response?.status === 200) {
        showToast('Details successfully updated!');
      } else {
        showToast('Oops, we ran into an issue here. Please try again.');
      }
    } catch (error) {
      console.log(error);
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
        onChangeText={(email) => setEmail(email)}
      />
      {/* TODO: Remove password from here */}
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />
      <Button text="Confirm Details" handler={updateHandler} />
      <Paragraph>Want to update your password? Click below</Paragraph>
      <Button
        text="Change Password"
        handler={() => console.log('Go to new password reset page')}
      />
    </View>
  );
}
