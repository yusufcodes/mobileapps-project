import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`function: getData - Error: ${e}`);
  }
};

export default getData;
