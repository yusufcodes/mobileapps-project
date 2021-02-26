import getToken from '../getToken';

const axios = require('axios');

export default async function addPhotoReview(locationId, reviewId, data) {
  const token = await getToken();
  try {
    const response = await axios({
      method: `post`,
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
      headers: {'X-Authorization': token, 'Content-Type': 'image/jpeg'},
      data,
    });
    console.log(`addPhotoReview: Photo has been added`);
    return response;
  } catch (error) {
    console.log(`addPhotoReview: ${error}`);
  }
}
