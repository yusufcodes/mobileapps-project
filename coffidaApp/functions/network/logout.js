import getToken from '../getToken';

const axios = require('axios');

export default async function logout() {
  console.log('logout: Running...');
  const token = await getToken();

  try {
    const response = await axios({
      method: 'post',
      url: `http://10.0.2.2:3333/api/1.0.0/user/logout`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    if (response.status === 200) {
      console.log('Logout: Successful - returning response...');
      return response;
    }
    if (response.status === 401) {
      console.log('Logout: Unauthorised');
      return null;
    }
    if (response.status === 500) {
      console.log('Logout: Server Error');
      return null;
    }
  } catch (error) {
    console.log(`Logout error: ${error}`);
  }
}
