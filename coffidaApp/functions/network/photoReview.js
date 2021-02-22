import getToken from '../getToken';

const axios = require('axios');

// add photo from review: POST - /location/{loc_id}/review/{rev_id}/photo
// delete photo from review: DELETE - /location/{loc_id}/review/{rev_id}/photo

export default async function photoReview(
  locationId,
  reviewId,
  data = null,
  deletePhoto = false,
) {
  const action = deletePhoto ? 'delete' : 'post';
  const token = await getToken();
  try {
    console.log(
      `photoReview: Performing add / remove on Review ID: ${reviewId} at location ID: ${locationId}`,
    );
    const response = await axios({
      method: `${action}`,
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo`,
      headers: {'X-Authorization': token, 'Content-Type': 'image/jpeg'},
      data,
    });
    console.log(`photoReview: Photo has been deleted / added`);
    return response;
  } catch (error) {
    console.log(`photoReview: ${error}`);
  }
}
