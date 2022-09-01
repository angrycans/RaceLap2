import React, { type FC, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import { useNavigation } from '@/hooks';
// import { WebRouteName } from '@/constants';
import { Navigator, Text, FocusAwareStatusBar, WebView } from '@/components';
import {
  TrackEndLine,
  TrackSection1,
  TrackSection2,
} from '@/components/Icons/MonoIcons';

const enum SelectionType {
  /** 默认空选项 */
  NONE = 'NONE',
  /** 终点线 */
  END_LINE = 'END_LINE',
  /** 赛段1 */
  SELECTION_1 = 'SELECTION_1',
  /** 赛段2 */
  SELECTION_2 = 'SELECTION_2',
}

const selections = [
  { label: '终点线', value: SelectionType.END_LINE },
  { label: '赛段 1', value: SelectionType.SELECTION_1 },
  { label: '赛段 2', value: SelectionType.SELECTION_2 },
] as const;

const iconMap = {
  [SelectionType.END_LINE]: TrackEndLine,
  [SelectionType.SELECTION_1]: TrackSection1,
  [SelectionType.SELECTION_2]: TrackSection2,
};

export const NewRacetrack: FC = () => {
  const {
    theme: {
      colors: { primary },
    },
  } = useTheme();
  const [racetrackName, setRacetrackName] = useState('');
  const [currentSelection, setCurrentSelection] = useState(SelectionType.NONE);
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
            disabled={!racetrackName.length}
            title="完成"
            onPress={() => {
              console.log('racetrackName -->', racetrackName);
            }}
          />
        );
      },
    }),
    [racetrackName],
  );
  const selectionsContent = useMemo(
    () => (
      <View style={styles.selector}>
        {selections.map((selection, idx) => {
          const IconComp = iconMap[selection.value];
          const isActive = currentSelection === selection.value;
          const color = isActive ? primary : '#AEAEB2';
          return (
            <Button
              type="clear"
              key={selection.value}
              buttonStyle={[
                styles.selectorItem,
                !!idx && styles.selectorItemNotFirst,
              ]}
              onPress={() => {
                setCurrentSelection(
                  isActive ? SelectionType.NONE : selection.value,
                );
              }}>
              <IconComp color={color} />
              <Text color={color} size={13} height={18}>
                {selection.label}
              </Text>
            </Button>
          );
        })}
      </View>
    ),
    [currentSelection, primary],
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Navigator
        title="新增赛道"
        headerLeft={HeaderLeft}
        headerRight={HeaderRight}
      />
      <View style={styles.wrapper}>
        <TextInput
          placeholder="请输入赛道/场所的名称"
          placeholderTextColor="#C7C7CC"
          style={styles.input}
          value={racetrackName}
          onChangeText={setRacetrackName}
        />
        {/* <WebView style={styles.map} page={WebRouteName.NEW_RACETRACK} /> */}
        <WebView style={styles.map} page="" />
        {selectionsContent}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  map: {
    marginTop: 8,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 12,
  },
  selector: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  selectorItemNotFirst: {
    marginLeft: 12,
  },
});

export default NewRacetrack;
