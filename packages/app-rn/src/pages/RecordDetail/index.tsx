import React, { type FC } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Title from './components/Title';

export const RecordDetail: FC = () => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Title title="9:14" subtitle="2022.06.30" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
  },
});

export default RecordDetail;
