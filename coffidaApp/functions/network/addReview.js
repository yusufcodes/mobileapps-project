import getToken from '../getToken';

const axios = require('axios');

export default async function addReview(locationId, data) {
  const token = await getToken();
  try {
    const response = await axios({
      method: 'post',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review`,
      responseType: 'json',
      headers: {'X-Authorization': token},
      data,
    });
    console.log('addReview: Review added.');
    return response;
  } catch (error) {
    console.log(error);
  }
}
