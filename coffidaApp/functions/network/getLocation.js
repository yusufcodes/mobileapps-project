import getToken from '../getToken';

const axios = require('axios');

export default async function getLocation(id) {
  console.log('Running getLocation');
  const token = await getToken();
  try {
    const response = await axios({
      method: 'get',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${id}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
