import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, IconButton, Paragraph} from 'react-native-paper';
import commonStyles from '../../styles/commonStyles';

export default function Pagination({limit, offset, setOffset, numberOfShops}) {
  const [currentPage, setCurrentPage] = useState(1);

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      borderWidth: 2,
      borderColor: 'black',
      width: 40,
      height: 40,
    },
    text: {
      marginHorizontal: 25,
    },
  });
  const totalPages = Math.ceil(numberOfShops / limit);

  return (
    <View style={styles.root}>
      <IconButton
        accessibilityLabel="Go to previous page"
        accessibilityHint="Switch the paginated results one page back"
        accessibilityRole="button"
        style={[commonStyles.primaryColor, styles.button]}
        icon="chevron-left"
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
      <Paragraph style={styles.text}>
        Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
      </Paragraph>
      <IconButton
        accessibilityLabel="Go to next page"
        accessibilityHint="Switch the paginated results one page forward"
        accessibilityRole="button"
        style={[commonStyles.primaryColor, styles.button]}
        icon="chevron-right"
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
