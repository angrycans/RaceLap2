import React, { type FC, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@/components';
import Title from './components/Title';
import Overview from './components/Overview';
import Table, { type Column, type DataItemBase } from './components/Table';

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
  const [data] = useState<DataItem[]>([
    {
      s1: '-',
      s2: '-',
      s3: '-',
      sTime: '1:32.98',
      delta: 0.34,
      key: '1',
    },
    {
      s1: '-',
      s2: '-',
      s3: '-',
      delta: 0.34,
      sTime: '1:32.98',
      key: '2',
    },
    {
      s1: '-',
      s2: '-',
      s3: '-',
      delta: -1.34,
      sTime: '1:32.98',
      key: '3',
    },
    {
      s1: '-',
      s2: '-',
      s3: '-',
      delta: 0.34,
      sTime: '1:32.98',
      key: '4',
    },
  ]);
  const columns = useMemo<Column<DataItem>[]>(
    () => [
      {
        title: '#',
        key: 'no',
        width: 20,
        render: (_, record, idx) => (
          <Text
            size={15}
            height={18}
            color={record.delta < 0 ? '#FF9500' : '#000'}>
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
        width: 120,
        align: 'center',
        render(val: string, record) {
          return (
            <>
              <Text
                size={15}
                height={18}
                color={record.delta < 0 ? '#FF9500' : '#000'}>
                {val}
              </Text>
              {!!record.delta && (
                <Text
                  size={12}
                  height={18}
                  style={styles.deltaTips}
                  color={record.delta < 0 ? '#34C759' : '#FF3B30'}>
                  {record.delta > 0 ? `+${record.delta}` : record.delta}
                </Text>
              )}
            </>
          );
        },
      },
    ],
    [],
  );

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Title title="9:14" subtitle="2022.06.30" />
        <Overview />
        <Title title="详细数据" style={styles.title} />
        <View style={styles.card} />
        <Table columns={columns} data={data} />
        <Title title="回顾分析" style={styles.title} />
        <View style={styles.card} />
      </View>
    </ScrollView>
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
  deltaTips: {
    position: 'absolute',
    top: -4,
    right: -6,
  },
});

export default RecordDetail;
