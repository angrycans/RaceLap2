import React, { type FC, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, useTheme } from '@rneui/themed';
import type { HeaderBackButtonProps } from '@react-navigation/elements';
import { MapView, MapType, Marker, type LatLng } from 'react-native-amap3d';
import { produce } from 'immer';
import { useMount } from 'ahooks';
import gcoord from 'gcoord';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { useNavigation } from '@/hooks';
import { Navigator, Text, FocusAwareStatusBar } from '@/components';
import {
  TrackEndLine,
  TrackSection1,
  TrackSection2,
} from '@/components/Icons/MonoIcons';
import { geo } from '@/apis';
import MarkerLine from './components/MarkerLine';
import { apis } from '@race-lap/app-helper/dist/native';

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
  const viewShotRef = useRef<ViewShot>(null);
  const [racetrackName, setRacetrackName] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [endLineSection, setEndLineSection] = useState<
    [LatLng | null, LatLng | null]
  >([null, null]);
  const [section1, setSection1] = useState<[LatLng | null, LatLng | null]>([
    null,
    null,
  ]);
  const [section2, setSection2] = useState<[LatLng | null, LatLng | null]>([
    null,
    null,
  ]);
  const [currentSelection, setCurrentSelection] = useState(SelectionType.NONE);
  const navigationRef = useRef(useNavigation());
  const snapshotFilename = `${racetrackName}-snapshot-${Date.now()}`;
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
        const validRacetrackName = racetrackName.trim();
        return (
          <Button
            type="clear"
            disabled={!validRacetrackName.length}
            title="完成"
            onPress={async () => {
              const sections = [endLineSection, section1, section2]
                .filter(section => section.every(Boolean))
                .map(section =>
                  section.map(point =>
                    gcoord.transform(
                      [point!.longitude, point!.latitude],
                      gcoord.GCJ02,
                      gcoord.EPSG3857,
                    ),
                  ),
                );
              const [snapshotTmpUrl, racetrackRoot] = await Promise.all([
                viewShotRef.current!.capture!(),
                apis.path.getInfo().then(res => res.data!.racetrackRoot),
              ]);
              const snapshotUrl = snapshotTmpUrl.replace(
                /[\s\S]*?\/([^/]+)$/,
                `${racetrackRoot}/$1`,
              );
              await RNFS.copyFile(snapshotTmpUrl, snapshotUrl);
              const { errCode } = await apis.racetrack.save({
                name: validRacetrackName,
                tracksector: sections
                  .map(section =>
                    section.map(point => point.join(',')).join(','),
                  )
                  .join(';'),
                snapshot: snapshotTmpUrl.replace(/[\s\S]*?\/([^/]+)$/, '$1'),
              });
              if (!errCode) {
                navigationRef.current.goBack();
              }
            }}
          />
        );
      },
    }),
    [racetrackName, endLineSection, section1, section2],
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

  useMount(async () => {
    const {
      coords: { longitude, latitude },
    } = await geo.getCurrentPosition();
    setCurrentLocation({ longitude, latitude });
  });

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
        {currentLocation && (
          <ViewShot
            style={styles.map}
            ref={viewShotRef}
            options={{
              fileName: snapshotFilename,
              format: 'jpg',
              quality: 0.5,
            }}>
            <MapView
              style={styles.mapView}
              mapType={MapType.Satellite}
              initialCameraPosition={{
                target: currentLocation,
                zoom: 18,
              }}
              onPress={({ nativeEvent }) => {
                const { longitude, latitude } = nativeEvent;
                const sectionInfoMap = {
                  [SelectionType.NONE]: null,
                  [SelectionType.END_LINE]: {
                    value: endLineSection,
                    setValue: setEndLineSection,
                  },
                  [SelectionType.SELECTION_1]: {
                    value: section1,
                    setValue: setSection1,
                  },
                  [SelectionType.SELECTION_2]: {
                    value: section2,
                    setValue: setSection2,
                  },
                } as const;
                const currentSectionInfo = sectionInfoMap[currentSelection];
                if (currentSectionInfo) {
                  let idx = currentSectionInfo.value.findIndex(
                    section => !section,
                  );
                  idx = idx !== -1 ? idx : 1;
                  currentSectionInfo.setValue(
                    produce(currentSectionInfo.value, draft => {
                      draft[idx] = { longitude, latitude };
                    }),
                  );
                }
              }}>
              <Marker
                position={currentLocation}
                icon={require('@/assets/images/icon-location.png')}
              />
              <MarkerLine
                editable={SelectionType.END_LINE === currentSelection}
                icon={<TrackEndLine color="#ffffff" />}
                points={endLineSection}
                onChange={setEndLineSection}
              />
              <MarkerLine
                editable={SelectionType.SELECTION_1 === currentSelection}
                icon={<TrackSection1 color="#ffffff" />}
                points={section1}
                onChange={setSection1}
              />
              <MarkerLine
                editable={SelectionType.SELECTION_2 === currentSelection}
                icon={<TrackSection2 color="#ffffff" />}
                points={section2}
                onChange={setSection2}
              />
            </MapView>
          </ViewShot>
        )}
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
    flex: 1,
    marginTop: 8,
    borderRadius: 12,
  },
  mapView: {
    flex: 1,
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
