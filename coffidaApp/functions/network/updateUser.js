import getId from '../getId';
import getToken from '../getToken';

const axios = require('axios');

export default async function updateUser(data) {
  const token = await getToken();
  const id = await getId();
  try {
    const response = await axios({
      method: 'patch',
      url: `http://10.0.2.2:3333/api/1.0.0/user/${parseInt(id)}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
      data,
    });
    return response;
  } catch (e) {
    console.log(`updateUser - Error: ${e}`);
  }
}
