import getToken from '../getToken';

const axios = require('axios');

export default async function logout(setLoggedOut, setErrorLogOut) {
  console.log('logout: Running...');
  const token = await getToken();

  try {
    const response = await axios({
      method: 'post',
      url: `http://10.0.2.2:3333/api/1.0.0/user/logout`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    if (response?.status === 200) {
      setLoggedOut(true);
      return response;
    }
    if (response?.status === 401) {
      setErrorLogOut(true);
      return response;
    }
    if (response?.status === 500) {
      setErrorLogOut(true);
      return response;
    }
  } catch (error) {
    setErrorLogOut(true);
    console.log(`Logout: ${error}`);
  }
}
