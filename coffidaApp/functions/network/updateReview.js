import getToken from '../getToken';

const axios = require('axios');

export default async function updateReview(locationId, reviewId, data) {
  const token = await getToken();
  try {
    const response = await axios({
      method: 'patch',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
      data,
    });
    return response;
  } catch (e) {
    console.log(`updateReview - Error: ${e}`);
  }
}
