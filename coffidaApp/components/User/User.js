import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Title, Subheading, Paragraph} from 'react-native-paper';
import Button from '../Global/Button';

const styles = StyleSheet.create({
  root: {
    padding: 30,
  },
  heading: {
    textAlign: 'center',
  },
  singleDetail: {
    flexDirection: 'row',
  },
});

export default function User({navigation}) {
  const displayUpdate = () => {
    navigation.navigate('Update');
  };

  return (
    <View style={styles.root}>
      <Title style={styles.heading}>My Profile</Title>
      <View style={styles.details}>
        <Subheading>Personal Details</Subheading>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>First Name: </Paragraph>
          <Paragraph>Yusuf</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Last Name: </Paragraph>
          <Paragraph>Chowdhury</Paragraph>
        </View>
        <View style={styles.singleDetail}>
          <Paragraph style={{fontWeight: 'bold'}}>Email: </Paragraph>
          <Paragraph>17031422@stu.mmu.ac.uk</Paragraph>
        </View>
      </View>
      <Button text="Update Details" handler={displayUpdate} />
    </View>
  );
}
