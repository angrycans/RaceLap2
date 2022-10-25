import React, { type FC, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRequest, useAsyncEffect } from 'ahooks';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import { apis } from '@race-lap/app-helper/dist/native';
import { utils, WebRouteName } from '@race-lap/app-helper';
import { Text, Title, Table, FocusAwareStatusBar, WebView } from '@/components';
import { useRoute } from '@/hooks';
import { RouteName } from '@/types';
import type { Column, DataItemBase } from '@/components/Table';
import Overview, { type OverviewInfo } from './components/Overview';
import ReviewAnalysis from './components/ReviewAnalysis';

interface DataItem extends DataItemBase {
  /** 唯一标识 */
  key: string;
  /** 第一圈 */
  s1: string;
  /** 第二圈 */
  s2: string;
  /** 第三圈 */
  s3: string;
  /** 相对变化量 */
  delta: number;
  /** 圈时 */
  sTime: string;
}

export const RecordDetail: FC = () => {
  const {
    params: { id },
  } = useRoute<RouteName.RECORD_DETAIL>();
  const [tableData, setTableData] = useState<DataItem[]>([]);
  const { data: recordListRes } = useRequest(apis.record.getList, {
    defaultParams: [{ id }],
    refreshDeps: [id],
  });

  const record = recordListRes?.data?.[0];

  const overviewInfo = useMemo<OverviewInfo>(() => {
    if (!record) {
      return {} as OverviewInfo;
    } else {
      const {
        racetrackName,
        username,
        carrierName,
        totalTime,
        maxSpeed,
        minCycleTime,
        cycleNum,
        avgSpeed,
        avgCycleTime,
      } = record;
      return {
        racetrackName,
        username,
        carrierName,
        totalTime,
        maxSpeed,
        minCycleTime,
        cycleNum,
        avgSpeed,
        avgCycleTime,
      };
    }
  }, [record]);

  const columns = useMemo<Column<DataItem>[]>(
    () => [
      {
        title: '#',
        key: 'no',
        width: 20,
        render: (_, item, idx) => (
          <Text
            size={15}
            height={18}
            color={item.delta >= 0 ? '#000' : '#FF9500'}>
            {idx}
          </Text>
        ),
      },
      {
        title: 'S1',
        key: 's1',
        width: 62,
        align: 'center',
      },
      {
        title: 'S2',
        key: 's2',
        width: 62,
        align: 'center',
      },
      {
        title: 'S3',
        key: 's3',
        width: 62,
        align: 'center',
      },
      {
        title: '圈时',
        key: 'sTime',
        width: 'auto-rest',
        align: 'center',
        render(val: string, item) {
          const deltaFormat = utils.timeStampFormat(item.delta, 'hh:mm:ss.SS', {
            autoClearZero: true,
          });
          return (
            <>
              <Text
                size={15}
                height={18}
                color={item.delta < 0 ? '#FF9500' : '#000'}>
                {val}
              </Text>
              {!!item.delta && (
                <Text
                  size={12}
                  height={18}
                  style={styles.deltaTips}
                  color={item.delta < 0 ? '#34C759' : '#FF3B30'}>
                  {item.delta < 0 ? `-${deltaFormat}` : `+${deltaFormat}`}
                </Text>
              )}
            </>
          );
        },
      },
    ],
    [],
  );

  const [startTime, startDate] = useMemo(
    () =>
      record?.startDate
        ? [
            dayjs(record.startDate).format('hh:mm'),
            dayjs(record.startDate).format('YYYY.MM.DD'),
          ]
        : ['-', '-'],
    [record?.startDate],
  );

  useAsyncEffect(async () => {
    if (!record) {
      return;
    }
    const { errCode, data: pathInfo } = await apis.path.getInfo();
    if (errCode || !pathInfo) {
      return;
    }

    const recordContentText = await RNFS.readFile(
      `${pathInfo.recordRoot}/${record.fileId}`,
    );

    const { cycles } = utils.record.parseData(recordContentText);
    let prevStime = cycles[0].timer;
    setTableData(
      cycles.map((cycle, idx) => ({
        key: String(idx),
        s1: '-',
        s2: '-',
        s3: '-',
        delta: cycle.timer - prevStime,
        sTime: utils.timeStampFormat(cycle.timer, 'hh:mm:ss.SS', {
          autoClearZero: true,
        }),
      })),
    );
  }, [record]);

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" />
      <ScrollView
        // https://github.com/react-native-webview/react-native-webview/issues/2364#issuecomment-1231649893
        removeClippedSubviews
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.wrapper}>
          <Title title={startTime} subtitle={startDate} />
          <Overview {...overviewInfo} />
          <Title title="详细数据" style={styles.title} />
          <WebView
            style={[styles.card, styles.barCharts]}
            page={`${WebRouteName.RECORD_DETAIL_BAR_CHART}/${id}`}
          />
          <Table columns={columns} data={tableData} />
          <Title title="回顾分析" style={styles.title} />
          <ReviewAnalysis
            username={overviewInfo.username}
            maxCycleNum={overviewInfo.cycleNum}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
  },
  title: {
    marginTop: 32,
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  barCharts: {
    height: 180,
  },
  deltaTips: {
    position: 'absolute',
    top: -4,
    right: -6,
  },
});

export default RecordDetail;
