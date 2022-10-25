import React, { type FC, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
// import RNFS from 'react-native-fs';
// import dayjs from 'dayjs';
import WifiManager from 'react-native-wifi-reborn';
import { useNavigation } from '@react-navigation/native';
// import { apis } from '@race-lap/app-helper/dist/native';
// import { utils } from '@race-lap/app-helper';
import { Text, FocusAwareStatusBar } from '@/components';
// import { device } from '@/apis';
import { PersonalHotspotCircleFill } from '@/components/Icons/MonoIcons';
import CustomHeader from './components/CustomHeader';
import LoopCircle from './components/LoopCircle';

interface Device extends WifiManager.WifiEntry {}

export const ConnectDevice: FC = () => {
  const navigation = useNavigation();
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    (async () => {
      try {
        // 连接设备
        if (Platform.OS === 'ios') {
          await WifiManager.connectToProtectedSSIDPrefix(
            'RaceLap',
            '88888888',
            false,
          );
        } else if (Platform.OS === 'android') {
          async function reScanAndLoadWifiListLoop() {
            clearTimeout(timeoutId);
            const wifiEntryList = await WifiManager.reScanAndLoadWifiList();
            setDeviceList(
              wifiEntryList
                .filter(wifiEntry => wifiEntry.SSID.startsWith('RaceLap'))
                .slice(0, 3),
            );
            timeoutId = setTimeout(reScanAndLoadWifiListLoop, 1000);
          }
          await reScanAndLoadWifiListLoop();
        } else {
        }
      } catch (err) {
        console.error(err);
      }

      // const remoteRecordInfoList = await device.getRecordInfoList();
      // await Promise.all(
      //   remoteRecordInfoList.map(async remoteRecordInfo => {
      //     const recordListRes = await apis.record.getList({
      //       fileId: remoteRecordInfo.filename,
      //     });
      //     const localRecord = recordListRes.data?.[0];
      //     if (localRecord && localRecord.fileSize === remoteRecordInfo.fileSize) {
      //       // 数据无变更
      //       return;
      //     }
      //     const { data: pathInfo } = await apis.path.getInfo();
      //     const [, recordContent] = await Promise.all([
      //       RNFS.downloadFile({
      //         fromUrl: remoteRecordInfo.remotePath,
      //         toFile: `${pathInfo!.recordRoot}/${remoteRecordInfo.filename}`,
      //       }).promise,
      //       fetch(remoteRecordInfo.remotePath).then(res => res.text()),
      //     ]);
      //     const { startDate, ...recordMeta } =
      //       utils.record.parseMeta(recordContent);
      //     const [racetrackId] = await Promise.all([
      //       apis.racetrack
      //         .getList({ name: recordMeta.racetrackName })
      //         .then(res => res?.data?.[0]?.id),
      //       // TODO 查询载具
      //     ]);
      //     const {
      //       totalTime,
      //       minCycleTime,
      //       maxSpeed,
      //       avgSpeed,
      //       avgCycleTime,
      //       cycleNum,
      //     } = utils.record.parseData(recordContent);
      //     await apis.record.save({
      //       ...recordMeta,
      //       totalTime,
      //       minCycleTime,
      //       maxSpeed,
      //       avgSpeed,
      //       avgCycleTime,
      //       cycleNum,
      //       id: localRecord?.id,
      //       fileSize: remoteRecordInfo.fileSize,
      //       fileId: remoteRecordInfo.filename,
      //       racetrackId,
      //       startDate: +dayjs(startDate, 'MM-DD-YYYY HH:mm:ss'),
      //     });
      //   }),
      // );
    })();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <LinearGradient
      start={{ x: 0.25, y: 0.25 }}
      end={{ x: 0.75, y: 0.75 }}
      colors={['#50B1F8', '#4294F7', '#3070F6']}
      locations={[0.042, 0.483, 1]}
      style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <FocusAwareStatusBar barStyle="dark-content" />
        <CustomHeader />
        <View style={[styles.wrapper, styles.contentWrapper]}>
          <Text style={styles.tips} color="#fff">
            {deviceList.length ? '请点击要配对的设备' : '寻找设备中...'}
          </Text>
          <View
            style={[
              styles.wrapper,
              styles.contentWrapper,
              styles.loopCircleWrapper,
            ]}>
            <LoopCircle />
          </View>
          <View style={styles.deviceListWrapper}>
            {deviceList.map((device, idx) => (
              <Button
                key={device.BSSID}
                iconRight
                size="lg"
                color="#fff"
                buttonStyle={[
                  styles.deviceItem,
                  !!idx && styles.deviceItemNotFirst,
                ]}
                // RaceLaper-13u49af
                title={<Text>{device.SSID}</Text>}
                icon={
                  <PersonalHotspotCircleFill
                    color="#D1D1D6"
                    style={styles.deviceItemIcon}
                  />
                }
                onPress={async () => {
                  try {
                    if (Platform.OS === 'android') {
                      await WifiManager.connectToProtectedSSID(
                        device.SSID,
                        '88888888',
                        false,
                      );
                      navigation.goBack();
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tips: {
    textAlign: 'center',
    position: 'absolute',
    top: 120,
  },
  loopCircleWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  deviceListWrapper: {},
  deviceItem: {
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
  deviceItemNotFirst: {
    marginTop: 12,
  },
  deviceItemIcon: {
    marginLeft: 14,
  },
});

export default ConnectDevice;
