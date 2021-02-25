import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Searchbar,
  IconButton,
  Dialog,
  Portal,
  Paragraph,
  Button,
  Subheading,
  Divider,
  Title,
  Headline,
} from 'react-native-paper';
import commonStyles from '../../styles/commonStyles';

export default function Search({
  searchQuery,
  onChangeSearch,
  overall,
  setOverall,
  price,
  setPrice,
  quality,
  setQuality,
  cleanliness,
  setCleanliness,
  list,
  setList,
  performSearch,
}) {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    search: {
      flex: 10,
      borderRadius: 50,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
    },
    icon: {
      flex: 2,
      margin: 0,
    },
    rating: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    picker: {
      height: 50,
      width: 150,
    },
    ratingText: {
      flex: 1,
    },
    title: {
      fontSize: 16,
    },
  });

  const PickerCustom = ({title, selectedValue, onValueChange}) => (
    <View style={styles.rating}>
      <Paragraph style={styles.ratingText}>{title}</Paragraph>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        mode="dropdown">
        <Picker.Item label="All Ratings" value="" />
        <Picker.Item label="1 and up" value={1} />
        <Picker.Item label="2 and up" value={2} />
        <Picker.Item label="3 and up" value={3} />
        <Picker.Item label="4 and up" value={4} />
        <Picker.Item label="5" value={5} />
      </Picker>
    </View>
  );

  return (
    <View style={styles.root}>
      <Searchbar
        placeholder="Search"
        searchAccessibilityLabel="Search for coffee shops"
        onChangeText={(searchQuery) => onChangeSearch(searchQuery)}
        value={searchQuery}
        style={styles.search}
      />
      <IconButton
        icon="format-list-checkbox"
        accessibilityLabel="Display search filters"
        size={30}
        style={[styles.icon, commonStyles.primaryColor]}
        onPress={() => setVisible(true)}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            hideDialog();
            performSearch();
          }}>
          <Dialog.ScrollArea>
            <Dialog.Title>Search Filter</Dialog.Title>
            <Dialog.Content>
              <Title style={styles.title}>Rating</Title>
              <PickerCustom
                title="Overall: "
                selectedValue={overall}
                onValueChange={setOverall}
              />
              <PickerCustom
                title="Price: "
                selectedValue={price}
                onValueChange={setPrice}
              />
              <PickerCustom
                title="Quality: "
                selectedValue={quality}
                onValueChange={setQuality}
              />
              <PickerCustom
                title="Cleanliness: "
                selectedValue={cleanliness}
                onValueChange={setCleanliness}
              />
            </Dialog.Content>
            <Divider />
            <Dialog.Content>
              <Title style={styles.title}>
                Favourited / Reviewed Locations
              </Title>
              <Picker
                selectedValue={list}
                style={styles.picker}
                onValueChange={(itemValue) => setList(itemValue)}
                mode="dropdown">
                <Picker.Item label="Any" value="" />
                <Picker.Item label="Favourites" value="favourite" />
                <Picker.Item label="Reviewed" value="reviewed" />
              </Picker>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                accessibilityLabel="Apply search filters"
                accessibilityHint="Uses selected filters to query search results for coffee shops"
                accessibilityRole="button"
                onPress={() => {
                  hideDialog();
                  performSearch();
                }}>
                Apply Filters
              </Button>
            </Dialog.Actions>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </View>
  );
}
