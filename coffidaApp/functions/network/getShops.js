import getToken from '../getToken';

const axios = require('axios');

export default async function getShops(
  searchQuery,
  overall,
  price,
  quality,
  cleanliness,
  list,
  limit = 0,
  offset = 0,
) {
  console.log('Running getShops');
  const token = await getToken();
  try {
    const response = await axios({
      method: 'get',
      url: `http://10.0.2.2:3333/api/1.0.0/find?q=${searchQuery}&overall_rating=${overall}&price_rating=${price}&quality_rating=${quality}&clenliness_rating=${cleanliness}&search_in=${list}&limit=${limit}&offset=${offset}`,
      responseType: 'json',
      headers: {'X-Authorization': token},
    });
    console.log(response.config.url);
    return response;
  } catch (error) {
    console.log(error);
  }
}
