import React from 'react';
import Camera from '../Global/Camera';
import showToast from '../../functions/showToast';

export default function UploadPhoto({navigation, route}) {
  /* Retrieve setter from parent component
  Note: This produces a warning from React Navigation however the issue did not
  seem relevant to my project, so did not prioritise removing it. */
  const {setPhotoData} = route.params;

  navigation.setOptions({title: 'Camera'});

  const storePhoto = (photoData) => {
    setPhotoData(photoData);
    showToast('Photo added to review!');
    console.log('Taking you back to Add a Review...');
    navigation.goBack();
  };

  return <Camera storePhoto={storePhoto} />;
}
