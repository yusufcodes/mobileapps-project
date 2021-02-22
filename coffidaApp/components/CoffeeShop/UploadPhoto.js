import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Camera from '../Global/Camera';

export default function UploadPhoto({navigation, route}) {
  const {setPhotoData} = route.params;
  const [uri, setUri] = useState(null);

  const storePhoto = (photoData) => {
    // setUri(photoData);
    console.log(photoData);

    setPhotoData(photoData);
    console.log('Taking you back to Add a Review...');
    navigation.navigate('AddReview');
  };

  return <Camera storePhoto={storePhoto} />;
}
