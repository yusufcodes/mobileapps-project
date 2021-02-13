import getToken from '../getToken';

const axios = require('axios');

export default async function deleteReview(locationId, reviewId) {
  console.log('Running deleteReview');
  const token = await getToken();
  try {
    const response = await axios({
      method: 'delete',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
