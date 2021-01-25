import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(`@${name}`, value);
  } catch (e) {
    console.log(`function: storeData - Error: ${e}`);
  }
};

export default storeData;
