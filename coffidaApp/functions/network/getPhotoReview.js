import getToken from '../getToken';

const axios = require('axios');

// add photo from review: POST - /location/{loc_id}/review/{rev_id}/photo
// delete photo from review: DELETE - /location/{loc_id}/review/{rev_id}/photo

export default async function getPhotoReview(locationId, reviewId) {
  const token = await getToken();
  try {
    const response = await axios({
      method: 'get',
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
      headers: {'X-Authorization': token},
    });

    return response;
  } catch (error) {
    // console.log(`getPhotoReview: ${error}`);
  }
}
