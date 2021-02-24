import storeData from '../storeData';

const axios = require('axios');

export default async function login(
  email,
  password,
  setLoggedIn,
  setLoginError,
  setInvalidLogin,
) {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://10.0.2.2:3333/api/1.0.0/user/login',
      responseType: 'json',
      data: {
        email,
        password,
      },
    });
    if (response.status === 200) {
      console.log('login: Successfully logged user in');
      storeData('token', response.data.token);
      storeData('id', response.data.id.toString());
      setLoggedIn(true);
    } else {
      setLoginError(true);
    }
  } catch (e) {
    if (e.response?.status === 400) {
      setInvalidLogin(true);
    } else {
      setLoginError(true);
    }

    console.log(`login.js: ${e}`);
  }
}
