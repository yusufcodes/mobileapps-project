import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

const Camera = () => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording},
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
    },
  ] = useCamera();

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{flex: 1}}
        autoFocus={autoFocus}
        onTextRecognized={textRecognized}
        onFacesDetected={facesDetected}
      />

      <TouchableWithoutFeedback
        style={{
          flex: 1,
        }}
        onPress={touchToFocus}
      />

      <TouchableOpacity
        testID="button"
        onPress={toggleFacing}
        style={{width: '100%', height: 45}}>
        {type}
      </TouchableOpacity>

      {!isRecording && (
        <TouchableOpacity
          onPress={async () => {
            try {
              setIsRecording(true);
              const data = await recordVideo();
              console.warn(data);
            } catch (error) {
              console.warn(error);
            } finally {
              setIsRecording(false);
            }
          }}
          style={{width: '100%', height: 45}}
        />
      )}
    </View>
  );
};

export default Camera;
