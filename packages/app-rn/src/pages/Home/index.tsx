import React, { type FC } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useMount } from 'ahooks';
import { apis } from '@race-lap/app-helper/dist/native';
import { FocusAwareStatusBar } from '@/components';
import { useUserAgreement } from '@/hooks';
import DriverAndDevice from './components/DriverAndDevice';
import RacetrackAndRecord from './components/RacetrackAndRecord';

export const Home: FC = () => {
  useUserAgreement();
  useMount(async () => {
    console.log(await apis.racetrack.getList());
  });

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentWrapper}>
            <DriverAndDevice />
            <RacetrackAndRecord />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
