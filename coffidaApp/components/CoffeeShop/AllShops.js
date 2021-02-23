import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {List, ActivityIndicator, Colors, Paragraph} from 'react-native-paper';
import getToken from '../../functions/getToken';
import Search from './Search';
import Pagination from '../Global/Pagination';

const axios = require('axios');

export default function AllShops({navigation}) {
  const [shops, setShops] = useState([]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  const [overall, setOverall] = useState('');
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [list, setList] = useState('');
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [numberOfShops, setNumberOfShops] = useState(0);

  const performSearch = async () => {
    setLoading(true);
    const token = await getToken();
    try {
      const responseTotalShops = await axios({
        method: 'get',
        url: `http://10.0.2.2:3333/api/1.0.0/find`,
        responseType: 'json',
        headers: {'X-Authorization': token},
      });

      setNumberOfShops(responseTotalShops?.data.length);
      console.log(
        `AllShops: Performing request with values: limit = ${limit}, offset = ${offset}`,
      );
      const response = await axios({
        method: 'get',
        url: `http://10.0.2.2:3333/api/1.0.0/find?q=${searchQuery}
&overall_rating=${overall}&price_rating=${price}&quality_rating=${quality}&clenliness_rating=${cleanliness}&search_in=${list}&limit=${limit}&offset=${offset}`,
        responseType: 'json',
        headers: {'X-Authorization': token},
      });

      const arrayOfShops = response.data.map((item) => ({
        id: item.location_id,
        name: item.location_name,
        town: item.location_town,
        rating: item.avg_overall_rating,
        reviews: item.location_reviews,
      }));
      console.log('AllShops: Got shops');
      setLoading(false);
      setShops(arrayOfShops);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    performSearch();
  }, [offset]);

  const outputShops = () => {
    if (loading) {
      return <ActivityIndicator animating size="large" color={Colors.red800} />;
    }
    if (shops.length > 0) {
      return shops?.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.name}`}
          description={`Town: ${item.town} \nRating: ${item.rating}`}
          descriptionNumberOfLines={2}
          left={(props) => <List.Icon {...props} icon="coffee" />}
          onPress={() => navigation.navigate('Shop', {id: item.id})}
        />
      ));
    }

    return <Paragraph>No results!</Paragraph>;
  };

  return (
    <View>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onChangeSearch={onChangeSearch}
        overall={overall}
        setOverall={setOverall}
        price={price}
        setPrice={setPrice}
        quality={quality}
        setQuality={setQuality}
        cleanliness={cleanliness}
        setCleanliness={setCleanliness}
        list={list}
        setList={setList}
        performSearch={performSearch}
      />
      {outputShops()}
      <Pagination
        limit={limit}
        offset={offset}
        setOffset={setOffset}
        numberOfShops={numberOfShops}
        performSearch={performSearch}
      />
    </View>
  );
}
