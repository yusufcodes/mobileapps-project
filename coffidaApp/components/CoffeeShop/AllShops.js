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
  // Array to store each shop. Iterated over to output them in a List
  const [shops, setShops] = useState([]);

  // Search functionality state
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  // Filter query parameter state
  const [overall, setOverall] = useState('');
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [list, setList] = useState('');

  const [loading, setLoading] = useState(true);

  // State values for pagination
  const [limit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [numberOfShops, setNumberOfShops] = useState(0);

  const performSearch = async () => {
    // Reset offset if it happens to go below 0
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

  /* If the user changes their search query or state, search will rerun to refresh the page. 
  Also runs when this tab is focused on again incase there are changes since leaving it. */
  useFocusEffect(
    React.useCallback(() => {
      performSearch();
    }, [offset, searchQuery]),
  );

  const styles = StyleSheet.create({
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
            // Reset search filters once user leaves AllShops component
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
      {/* Note: Lots of props passed to manipulate state in child component
      In future, it may be better to use React Context but did not have time to refactor.
      */}
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
