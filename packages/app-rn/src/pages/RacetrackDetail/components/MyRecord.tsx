import React, { type FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { Text } from '@/components';
import { useNavigation } from '@/hooks';
import { RouteName } from '@/constants';
import { Timer, Bicycle } from '@/components/Icons/MonoIcons';

export const MyRecord: FC = () => {
  const navigation = useNavigation();
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <Button
          key={idx}
          buttonStyle={styles.noStyleClearBtn}
          type="clear"
          onPress={() => navigation.navigate(RouteName.RECORD_DETAIL)}>
          <View style={[styles.cardWrapper, styles.recordItem]}>
            <View style={styles.row}>
              <Text>9:41</Text>
              <View style={styles.row}>
                <Timer color="#FF9500" />
                <Text bold color="#FF9500" style={styles.recordScore}>
                  9:41
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.row, styles.alignCenter]}>
                <Bicycle width={22} color="#000" />
                <Text style={[styles.recordText, styles.carName]}>GX200</Text>
              </View>
              <View style={[styles.row, styles.alignCenter]}>
                <Text style={[styles.recordText, styles.raceTrackNum]}>4</Text>
                <Text style={styles.raceTrackNumUnit}>圈</Text>
              </View>
            </View>
          </View>
        </Button>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
  racetrackList: {
    // marginTop: 12,
  },
  noStyleClearBtn: {
    margin: 0,
    padding: 0,
    paddingHorizontal: 0,
  },
  recordScore: {
    marginLeft: 6,
  },
  alignCenter: {
    alignItems: 'center',
  },
  recordText: {
    fontSize: 15,
    lineHeight: 20,
  },
  carName: {
    fontWeight: '500',
    marginLeft: 4,
  },
  raceTrackNum: {
    fontWeight: '600',
  },
  raceTrackNumUnit: {
    fontSize: 11,
    lineHeight: 14,
    marginLeft: 4,
  },
  recordItem: {
    flex: 1,
  },
});

export default MyRecord;
