import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, IconButton, Paragraph} from 'react-native-paper';

export default function Pagination({limit, offset, setOffset, numberOfShops}) {
  const [currentPage, setCurrentPage] = useState(1);

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
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
          }
        }}
        disabled={currentPage === 1}
      />
      <Paragraph>
        Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
      </Paragraph>
      <IconButton
        icon="chevron-right"
        color={Colors.black}
        size={35}
        onPress={() => {
          if (currentPage < totalPages) {
            console.log('Increasing offset...');
            setOffset(offset + limit);
            setCurrentPage(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </View>
  );
}
