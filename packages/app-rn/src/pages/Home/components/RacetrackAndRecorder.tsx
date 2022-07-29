import React, { type FC } from 'react';
import { View, StyleSheet } from 'react-native';
// import { Icon /**  Button, useTheme */ } from '@rneui/themed';
import { Text } from '@/components';
import Title from './Title';

export const RacetrackAndRecorder: FC = () => {
  // const { theme } = useTheme();
  return (
    <View style={styles.wrapper}>
      <Title title="赛道和记录" />
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <Text>RacetrackAndRecorder</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
});

export default RacetrackAndRecorder;
