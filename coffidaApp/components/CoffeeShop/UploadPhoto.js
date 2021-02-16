import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Camera from '../Global/Camera';

export default function UploadPhoto({navigation, route}) {
  const {setPhotoUri} = route.params;
  const [uri, setUri] = useState(null);

  const storeUri = (photoUri) => {
    setUri(photoUri);
    console.log(`UploadPhoto: Stored photo URI: ${photoUri}`);
    setPhotoUri(photoUri);
    console.log('Taking you back to Add a Review...');
    navigation.navigate('AddReview');
  };

  return <Camera storeUri={storeUri} />;
}
