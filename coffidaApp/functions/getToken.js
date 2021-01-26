import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`function: getToken - Error: ${e}`);
  }
};

export default getToken;
