import getToken from '../getToken';

const axios = require('axios');

export default async function deletePhotoReview(locationId, reviewId) {
  const token = await getToken();
  try {
    const response = await axios({
      method: `delete`,
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
      headers: {'X-Authorization': token},
    });
    console.log(`deletePhotoReview: Photo has been deleted`);
    return response;
  } catch (error) {
    console.log(`deletePhotoReview: ${error}`);
  }
}
