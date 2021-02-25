import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {List, ActivityIndicator, Colors, Paragraph} from 'react-native-paper';
import getToken from '../../functions/getToken';
import getShops from '../../functions/network/getShops';
import showToast from '../../functions/showToast';
import Search from './Search';
import Pagination from '../Global/Pagination';

const axios = require('axios');

// TODO: useFocusEffect like in User to reload the data.
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
    const responseTotalShops = await getShops(
      searchQuery,
      overall,
      price,
      quality,
      cleanliness,
      list,
    );
    if (!responseTotalShops) {
      showToast('Failed to load shops, please try reloading this tab.');
      setLoading(false);
      return;
    }
    setNumberOfShops(responseTotalShops?.data.length);

    const response = await getShops(
      searchQuery,
      overall,
      price,
      quality,
      cleanliness,
      list,
      limit,
      offset,
    );

    if (!response || response.status !== 200) {
      showToast('Failed to load shops, please try reloading this tab.');
    }

    const arrayOfShops = response?.data.map((item) => ({
      id: item.location_id,
      name: item.location_name,
      town: item.location_town,
      rating: item.avg_overall_rating,
      reviews: item.location_reviews,
    }));
    setLoading(false);
    setShops(arrayOfShops);
  };

  useEffect(() => {
    performSearch();
  }, [offset, searchQuery]);

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
