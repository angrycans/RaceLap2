import React, { type FC, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useMount } from 'ahooks';
import { useRoute, useNavigation } from '@/hooks';
import { Title, Table, Text } from '@/components';
import { RouteName } from '@/constants';
import ReaceTrackInfo from './components/RaceTrackInfo';
import MyRecord from './components/MyRecord';
import type { Column, DataItemBase } from '@/components/Table';

interface DataItem extends DataItemBase {}
export const RacetrackDetail: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteName.RACETRACK_DETAIL>();
  const [data] = useState<DataItem[]>(
    Array.from({ length: 3 }, (_, idx) => ({
      time: '-',
      nickName: '-',
      carrier: '-',
      key: `${idx}`,
    })),
  );
  const columns = useMemo<Column<DataItem>[]>(
    () => [
      {
        title: '#',
        key: 'no',
        width: 20,
        render: (_, __, idx) => (
          <Text size={15} height={18}>
            {idx}
          </Text>
        ),
      },
      {
        title: '时间',
        key: 'time',
        width: 62,
        align: 'center',
      },
      {
        title: '昵称',
        key: 'nickName',
        width: 62,
        align: 'center',
      },
      {
        title: '载具',
        key: 'carrier',
        width: 62,
        align: 'center',
      },
    ],
    [],
  );

  useMount(() => navigation.setOptions({ title: route.params.title }));

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <ReaceTrackInfo />
        <Title style={styles.title} title="最快圈时" />
        <Table columns={columns} data={data} />
        <Title style={styles.title} title="我的记录" />
        <MyRecord />
      </View>
    </ScrollView>
  );
};

export default RacetrackDetail;

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
  },
  title: {
    marginTop: 32,
  },
});
