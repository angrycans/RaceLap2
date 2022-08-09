import type { HeaderBackButtonProps } from '@react-navigation/elements';
import React, { type FC, useState, useRef, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import { useNavigation } from '@/hooks';
import { Navigator, Text, FocusAwareStatusBar } from '@/components';
import { CheckmarkCircleFill } from '@/components/Icons/MonoIcons';

const racetrackList = [
  { name: '不选择赛道', key: 'none', address: '' },
  ...Array.from({ length: 5 }, (_, idx) => ({
    name: `南京荔湾赛车场南京荔湾赛车场南京荔湾赛车场${idx}`,
    address: `江宁区梅龙路与马家塘路交叉路口往北约24江宁区梅龙路与马家塘路交叉路口往北约24${idx}米`,
    key: `racetrack-${idx}`,
  })),
];

export const SelectRacetrack: FC = () => {
  const {
    theme: {
      colors: { primary },
    },
  } = useTheme();
  const [racetrack, setRacetrack] = useState('none');
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
            disabled={!racetrack}
            title="完成"
            onPress={() => {
              console.log('racetrack -->', racetrack);
            }}
          />
        );
      },
    }),
    [racetrack],
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
              key={item.key}
              type="clear"
              iconRight
              buttonStyle={styles.listItem}
              icon={
                <CheckmarkCircleFill
                  color={item.key === racetrack ? primary : '#D1D1D6'}
                  width={22}
                />
              }
              onPress={() => setRacetrack(item.key)}>
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
