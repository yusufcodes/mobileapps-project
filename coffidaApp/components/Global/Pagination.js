import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, IconButton, Paragraph} from 'react-native-paper';

export default function Pagination({
  limit,
  offset,
  setOffset,
  numberOfShops,
  performSearch,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  console.log(`Number of shops Pagination: ${numberOfShops}`);
  const totalPages = Math.ceil(numberOfShops / limit);

  return (
    <View style={styles.root}>
      <IconButton
        icon="chevron-left"
        color={Colors.black}
        size={35}
        onPress={() => {
          if (currentPage > 1) {
            console.log('Decreasing offset...');
            setOffset(offset - limit);
            setCurrentPage(currentPage - 1);
            // performSearch();
          }
        }}
        disabled={currentPage === 1 ? true : false}
      />
      <Paragraph>
        Page {currentPage} of {totalPages}
      </Paragraph>
      <IconButton
        icon="chevron-right"
        color={Colors.black}
        size={35}
        onPress={() => {
          if (currentPage < totalPages) {
            console.log('Increasing offset...');
            setOffset(offset + limit);
            // setOffset((prevOffset) => prevOffset + limit);
            setCurrentPage(currentPage + 1);
            // performSearch();
          }
        }}
        disabled={currentPage === totalPages ? true : false}
      />
    </View>
  );
}
