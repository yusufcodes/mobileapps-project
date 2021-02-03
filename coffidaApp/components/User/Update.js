import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph, TextInput} from 'react-native-paper';
import Button from '../Global/Button';

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  heading: {
    textAlign: 'center',
  },
});

export default function Update() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const updateHandler = () => {
    console.log('To do: perform request to update user details');
  };
  return (
    <View style={styles.root}>
      <Title style={styles.heading}>Update Details</Title>
      <TextInput
        label="firstName"
        value={firstName}
        mode="outlined"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        label="lastName"
        value={lastName}
        mode="outlined"
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <TextInput
        label="email"
        value={email}
        mode="outlined"
        onChangeText={(email) => setEmail(email)}
      />
      <Button text="Confirm Details" handler={updateHandler} />
    </View>
  );
}
