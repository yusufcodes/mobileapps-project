import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {
  Searchbar,
  IconButton,
  Colors,
  Dialog,
  Portal,
  Paragraph,
  Button,
  Subheading,
  Divider,
} from 'react-native-paper';

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
    },
    search: {
      flex: 11,
    },
    icon: {
      flex: 1,
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
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      <IconButton
        icon="filter-variant"
        color={Colors.black}
        size={30}
        style={styles.icon}
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
              <Subheading>Rating</Subheading>
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
              <Subheading>Favourited / Reviewed Locations</Subheading>
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
