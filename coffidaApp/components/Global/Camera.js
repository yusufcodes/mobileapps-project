/* eslint-disable react/jsx-no-bind */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
class Camera extends Component {
  takePicture = async () => {
    const {storePhoto} = this.props;
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      storePhoto(data);
      // console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            icon="camera"
            mode="contained"
            onPress={this.takePicture.bind(this)}>
            Capture
          </Button>
        </View>
      </View>
    );
  }
}

export default Camera;
