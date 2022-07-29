import React, { type FC } from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useUserAgreement } from '@/hooks';
import DriverAndDevice from './components/DriverAndDevice';
import RacetrackAndRecorder from './components/RacetrackAndRecorder';

export const Home: FC = () => {
  useUserAgreement();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentWrapper}>
            <DriverAndDevice />
            <RacetrackAndRecorder />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginTop: 16,
    marginHorizontal: 16,
  },
});

export default Home;
