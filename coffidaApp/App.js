/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import SignUp from './components/User/SignUp';

const styles = StyleSheet.create({});

const App = () => (
  <PaperProvider>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <SignUp />
      </ScrollView>
    </SafeAreaView>
  </PaperProvider>
);

export default App;
