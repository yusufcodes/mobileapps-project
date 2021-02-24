import {ToastAndroid} from 'react-native';

const showToast = (text) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    40,
    60,
  );
};

export default showToast;
