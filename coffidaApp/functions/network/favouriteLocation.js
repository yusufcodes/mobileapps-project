import getToken from '../getToken';

const axios = require('axios');

// Favourite: POST - /location/{loc_id}/favourite
// Unfavourite: DELETE - /location/{loc_id}/favourite

export default async function favouriteLocation(locationId, unfav = false) {
  const action = unfav ? 'delete' : 'post';
  const token = await getToken();
  try {
    console.log(`favouriteLocation: Performing on location ID: ${locationId}`);
    const response = await axios({
      method: `${action}`,
      url: `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/favourite`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    console.log('favouriteLocation: Location has been liked / unliked.');
    return response;
  } catch (error) {
    console.log(`favouriteLocation: ${error}`);
  }
}
