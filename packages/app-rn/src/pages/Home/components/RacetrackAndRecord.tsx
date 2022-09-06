import React, { useEffect, useMemo, type FC } from 'react';
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useRequest } from 'ahooks';
import { useNavigation } from '@/hooks';
import { Button } from '@rneui/themed';
import { Text } from '@/components';
import { RouteName } from '@/constants';
import {
  MappinAndEllipse,
  PlusCircle,
  Timer,
  Bicycle,
} from '@/components/Icons/MonoIcons';
import { apis } from '@race-lap/app-helper/dist/native';
import { useIsFocused } from '@react-navigation/native';
import Title from './Title';

export const RacetrackAndRecord: FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { data: racetrackListRes, run: getRacetrackList } = useRequest(
    apis.racetrack.getList,
    {
      manual: true,
    },
  );
  const { data: recordListRes, run: getRecordList } = useRequest(
    apis.record.getList,
    {
      manual: true,
    },
  );
  const racetrackList = useMemo(
    () => racetrackListRes?.data || [],
    [racetrackListRes],
  );
  const recordList = useMemo(() => recordListRes?.data || [], [recordListRes]);

  useEffect(() => {
    if (isFocused) {
      getRacetrackList();
      getRecordList();
    }
  }, [isFocused, getRacetrackList, getRecordList]);

  return (
    <View style={styles.wrapper}>
      <Title title="赛道和记录" />
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <View style={[styles.row, styles.titleWrapper]}>
            <MappinAndEllipse
              style={styles.titleIcon}
              width={20}
              color="#AF52DE"
            />
            <Text bold color="#AF52DE">
              赛道
            </Text>
          </View>
          <Button
            buttonStyle={styles.plusBtn}
            type="clear"
            icon={<PlusCircle width={20} />}
            onPress={() => navigation.navigate(RouteName.NEW_RACETRACK)}
          />
        </View>
        <ScrollView horizontal style={styles.racetrackList}>
          {racetrackList.map((racetrack, idx) => (
            <Button
              buttonStyle={[
                styles.noStyleClearBtn,
                styles.racetrackItem,
                !!idx && styles.racetrackItemGap,
              ]}
              type="clear"
              key={idx}
              onPress={() =>
                navigation.navigate(RouteName.RACETRACK_DETAIL, {
                  title: racetrack.name || '',
                })
              }>
              <ImageBackground
                style={[styles.racetrackItemContentWrapper]}
                source={{
                  uri: racetrack.snapshot,
                }}>
                {!idx ? (
                  <View style={styles.nearbyTag}>
                    <Text style={styles.nearbyTagText}>附近</Text>
                  </View>
                ) : (
                  <View />
                )}
                <Text numberOfLines={1} style={styles.racetrackName}>
                  {racetrack.name || '未知'}
                </Text>
              </ImageBackground>
            </Button>
          ))}
        </ScrollView>
      </View>
      {recordList.map((_, idx) => (
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
                <Text style={[styles.recordText, styles.carName]}>演示车</Text>
              </View>
              <View style={[styles.row, styles.alignCenter]}>
                <Text style={[styles.recordText, styles.raceTrackNum]}>4</Text>
                <Text style={styles.raceTrackNumUnit}>圈</Text>
              </View>
            </View>
          </View>
        </Button>
      ))}
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
  titleWrapper: {
    alignItems: 'center',
  },
  titleIcon: {
    marginLeft: 2,
    marginRight: 4,
  },
  plusBtn: {
    padding: 0,
    paddingHorizontal: 0,
  },
  racetrackList: {
    marginTop: 12,
  },
  noStyleClearBtn: {
    margin: 0,
    padding: 0,
    paddingHorizontal: 0,
  },
  racetrackItemGap: {
    marginLeft: 8,
  },
  racetrackItem: {},
  racetrackItemContentWrapper: {
    width: 96,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  nearbyTag: {
    backgroundColor: '#34C759',
    padding: 4,
    alignSelf: 'flex-start',
    borderBottomRightRadius: 4,
    overflow: 'hidden',
  },
  nearbyTagText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 14,
  },
  racetrackName: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    padding: 8,
    color: '#fff',
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

export default RacetrackAndRecord;
