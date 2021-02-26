import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {List, Paragraph} from 'react-native-paper';
import getShops from '../../functions/network/getShops';
import showToast from '../../functions/showToast';
import Search from './Search';
import Pagination from '../Global/Pagination';
import Loader from '../Global/Loader';
import Star from '../Global/Star';

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
  const [limit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [numberOfShops, setNumberOfShops] = useState(0);

  const performSearch = async () => {
    if (offset < 0) {
      setOffset(0);
    }
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

  useFocusEffect(
    React.useCallback(() => {
      performSearch();
    }, [offset, searchQuery]),
  );

  const styles = StyleSheet.create({
    main: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
    rootListItem: {
      paddingHorizontal: 30,
    },
    listTitle: {
      fontSize: 18,
    },
    listDescription: {
      paddingVertical: 5,
    },
    details: {
      color: '#6b6b6b',
    },
    starDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    noResults: {
      textAlign: 'center',
      marginVertical: 15,
    },
  });

  const outputShops = () => {
    if (loading) {
      return <Loader size="large" />;
    }
    if (shops.length > 0) {
      return shops?.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.name}`}
          description={() => (
            <View style={styles.starDetails}>
              <Paragraph style={styles.details}>{item.town}</Paragraph>
              <Star
                rating={Math.floor(item.rating)}
                starSize={15}
                starMargin={2}
                disabled
              />
            </View>
          )}
          left={(props) => <List.Icon {...props} icon="coffee" />}
          onPress={() => {
            // Reset search filters so when they return it is reset
            setOverall('');
            setCleanliness('');
            setPrice('');
            setQuality('');
            setList('');
            navigation.navigate('Shop', {id: item.id});
          }}
          style={styles.rootListItem}
          titleStyle={styles.listTitle}
          descriptionStyle={styles.listDescription}
        />
      ));
    }

    return (
      <Paragraph style={styles.noResults}>
        No coffee shops - try refining your search!
      </Paragraph>
    );
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
        setOffset={setOffset}
      />

      {outputShops()}
      {shops.length > 0 ? (
        <Pagination
          limit={limit}
          offset={offset}
          setOffset={setOffset}
          numberOfShops={numberOfShops}
        />
      ) : null}
    </View>
  );
}
