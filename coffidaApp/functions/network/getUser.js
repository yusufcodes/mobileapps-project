import getToken from '../getToken';
import getId from '../getId';

const axios = require('axios');

export default async function getUser() {
  const token = await getToken();
  const id = await getId();
  try {
    const response = await axios({
      method: 'get',
      url: `http://10.0.2.2:3333/api/1.0.0/user/${parseInt(id)}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    console.log('getUser: Retrieved user information.');
    return response;
  } catch (error) {
    console.log(error);
  }
}
