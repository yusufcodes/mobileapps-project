import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Camera from '../Global/Camera';
import showToast from '../../functions/showToast';

export default function UploadPhoto({navigation, route}) {
  const {setPhotoData} = route.params;

  const storePhoto = (photoData) => {
    setPhotoData(photoData);
    showToast('Photo added to review!');
    console.log('Taking you back to Add a Review...');
    navigation.goBack();
  };

  return <Camera storePhoto={storePhoto} />;
}
