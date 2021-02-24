import getToken from '../getToken';

const axios = require('axios');

// add photo from review: POST - /location/{loc_id}/review/{rev_id}/photo
// delete photo from review: DELETE - /location/{loc_id}/review/{rev_id}/photo

export default async function getPhotoReview(locationId, reviewId) {
  const token = await getToken();
  try {
    console.log(
      `getPhotoReview: Performing GET on Review ID: ${reviewId} at location ID: ${locationId}`,
    );
    const response = await axios({
      method: 'get',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
      headers: {'X-Authorization': token},
    });
    if (response?.status === 200) {
      console.log('getPhotoReview: Photo has been retrieved');
    } else if (response?.status === 404) {
      console.log('getPhotoReview: No photo found on this review');
    }

    return response;
  } catch (error) {
    console.log(`getPhotoReview: ${error}`);
  }
}
