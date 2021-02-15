import React, {useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';
import Camera from '../Camera';

export default function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const styles = StyleSheet.create({
    container: {
      padding: 50,
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'lightgreen',

      width: '100%',
    },
  });

  const login = async () => {
    Keyboard.dismiss();
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
      {/* <Camera /> */}
    </View>
  );
}
