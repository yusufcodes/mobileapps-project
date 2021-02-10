import getToken from '../getToken';

const axios = require('axios');

export default async function likeReview(locationId, reviewId, unlike = false) {
  const action = unlike ? 'delete' : 'post';
  const token = await getToken();
  try {
    console.log(
      `LikeReview: Performing on reivew with ID: ${reviewId} at location ID: ${locationId}`,
    );
    const response = await axios({
      method: `${action}`,
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/like`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    console.log('likeReview: Review has been liked / unliked.');
    return response;
  } catch (error) {
    console.log(`likeReview: ${error}`);
  }
}
