const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`function: getData - Error: ${e}`);
  }
};

export default getData;
