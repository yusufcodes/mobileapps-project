import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  root: {
    padding: 50,
  },
  primaryColor: {
    color: '#9B4949',
  },
  headlineLogo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputSpacing: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  scrollViewMargin: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});

export default commonStyles;
