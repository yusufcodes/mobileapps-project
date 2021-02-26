import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {RNCamera} from 'react-native-camera';
import showToast from '../../functions/showToast';

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 30,
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

// Camera class mostly copied from documentation
class Camera extends Component {
  takePicture = async () => {
    showToast('Capturing photo...');
    const {storePhoto} = this.props;
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      storePhoto(data);
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
          captureAudio={false}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <IconButton
            icon="camera"
            size={50}
            accessibilityLabel="Capture Photo"
            accessibilityHint="Take the photo in the frame to use in your review"
            accessibilityRole="button"
            // Style guide causes an error here but intentionally left it for Camera to work.
            onPress={this.takePicture.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default Camera;
