import type { HeaderBackButtonProps } from '@react-navigation/elements';
import { type Racetrack } from '@race-lap/app-helper';
import React, { type FC, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import { useRequest } from 'ahooks';
import { apis } from '@race-lap/app-helper/dist/native';
import { useNavigation, useRoute } from '@/hooks';
import { RouteName } from '@/constants';
import { Navigator, Text, FocusAwareStatusBar } from '@/components';
import { CheckmarkCircleFill } from '@/components/Icons/MonoIcons';

export const SelectRacetrack: FC = () => {
  const {
    params: { id },
  } = useRoute<RouteName.SELECT_RACETRACK>();
  const {
    theme: {
      colors: { primary },
    },
  } = useTheme();
  const [racetrackId, setRacetrackId] = useState<number | null>(id);
  const { data: racetrackListRes } = useRequest(apis.racetrack.getList);
  const racetrackList = useMemo(
    () =>
      [{ id: null, name: '不选择赛道' } as any as Racetrack].concat(
        racetrackListRes?.data || [],
      ),
    [racetrackListRes],
  );
  const navigationRef = useRef(useNavigation());
  const { HeaderLeft, HeaderRight } = useMemo(
    () => ({
      HeaderLeft() {
        return (
          <Button
            type="clear"
            title="取消"
            onPress={() => navigationRef.current.goBack()}
          />
        );
      },
      HeaderRight(_: HeaderBackButtonProps) {
        return (
          <Button
            type="clear"
            title="完成"
            onPress={async () => {
              if (racetrackId === null) {
              } else {
              }
            }}
          />
        );
      },
    }),
    [racetrackId],
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" />
      <Navigator
        title="赛道"
        headerLeft={HeaderLeft}
        headerRight={HeaderRight}
      />
      <ScrollView>
        <View style={styles.wrapper}>
          {racetrackList.map(item => (
            <Button
              key={item.id}
              type="clear"
              iconRight
              buttonStyle={styles.listItem}
              icon={
                <CheckmarkCircleFill
                  color={item.id === racetrackId ? primary : '#D1D1D6'}
                  width={22}
                />
              }
              onPress={() => setRacetrackId(item.id)}>
              <View style={styles.info}>
                <Text bold numberOfLines={1}>
                  {item.name}
                </Text>
                {!!item.address && (
                  <Text
                    numberOfLines={1}
                    style={styles.address}
                    size={13}
                    height={18}
                    color="#AEAEB2">
                    {item.address}
                  </Text>
                )}
              </View>
            </Button>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  info: {
    flex: 1,
  },
  address: {
    marginTop: 5,
  },
});

export default SelectRacetrack;
