import React, {useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {TextInput, Headline, Subheading, Button} from 'react-native-paper';

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

  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
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
      <RNCamera style={styles.preview} captureAudio={false} />
      <Button onPress={() => takePicture()}>Take Photo</Button>
    </View>
  );
}
