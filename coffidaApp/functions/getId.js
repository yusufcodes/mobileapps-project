import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@id');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`function: getId - Error: ${e}`);
  }
};

export default getToken;
