import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Paragraph} from 'react-native-paper';
import commonStyles from '../../styles/commonStyles';

export default function Pagination({limit, offset, setOffset, numberOfShops}) {
  // Set initial page to 1
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

  // Calculate total pages for pagination to show user
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
          // Use setters to manipulate offset in search query (in AllShops)
          // This will perform the change in page
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
        // Use setters to manipulate offset in search query (in AllShops)
        // This will perform the change in page
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
