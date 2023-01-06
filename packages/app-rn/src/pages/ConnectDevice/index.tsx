import React, { type FC, useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey, BLE_SERVICE_UUID } from '@/constants';
import { Button, useTheme } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
// import { FileSystem } from 'react-native-file-access';
// import RNFS from 'react-native-fs';
// import dayjs from 'dayjs';
import { useThrottleFn } from 'ahooks';
import { EventName, Device } from '@race-lap/app-helper';
import { eventBus } from '@race-lap/app-helper/dist/native';
import { useNavigation } from '@react-navigation/native';
// import { apis } from '@race-lap/app-helper/dist/native';
// import { utils } from '@race-lap/app-helper';
import { Text, FocusAwareStatusBar } from '@/components';
// import { device as deviceApi } from '@/apis';
import { PersonalHotspotCircleFill } from '@/components/Icons/MonoIcons';
import CustomHeader from './components/CustomHeader';
import LoopCircle from './components/LoopCircle';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export const ConnectDevice: FC = () => {
  const deviceMap = useRef<Record<string, Device>>({});
  const {
    theme: {
      colors: { primary: primaryColor },
    },
  } = useTheme();
  const navigation = useNavigation();
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const { run: updateDeviceList } = useThrottleFn(
    async (newDevice?: Device) => {
      const connectedPeripherals = await BleManager.getConnectedPeripherals([
        BLE_SERVICE_UUID,
      ]);
      connectedPeripherals.forEach(peripheral => {
        deviceMap.current[peripheral.id] =
          deviceMap.current[peripheral.id] || peripheral;
        deviceMap.current[peripheral.id].connected = true;
      });
      if (newDevice) {
        deviceMap.current[newDevice.id] = newDevice;
      }
      setDeviceList(Object.values(deviceMap.current));
    },
  );

  useEffect(() => {
    updateDeviceList();
    const subscription = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      updateDeviceList,
    );
    (async () => {
      try {
        // 连接设备
        setTimeout(() => BleManager.scan([BLE_SERVICE_UUID], 3, true), 100);
      } catch (err) {
        console.error(err);
      }

      // const remoteRecordInfoList = await deviceApi.getRecordInfoList();
      // console.log('remoteRecordInfoList ==>', remoteRecordInfoList);
      // await Promise.all(
      //   remoteRecordInfoList.map(async remoteRecordInfo => {
      //     const recordListRes = await apis.record.getList({
      //       fileId: remoteRecordInfo.filename,
      //     });
      //     const localRecord = recordListRes.data?.[0];
      //     if (
      //       localRecord &&
      //       localRecord.fileSize === remoteRecordInfo.fileSize
      //     ) {
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

      // await Promise.all(
      //   remoteRecordInfoList.map(async remoteRecordInfo => {
      //     const { fileSize, remotePath } = remoteRecordInfo;
      //     const [content] = await Promise.all([
      //       fetch(remotePath).then(res => res.text()),
      //     ]);

      //     const recordListRes = await apis.record.getList({ fileSize });
      //     const localRecord = recordListRes.data?.[0];
      //     if (localRecord) {
      //       // 重复导入
      //       return;
      //     }

      //     const { startDate, ...recordMeta } = utils.record.parseMeta(content);
      //     const [racetrackId, { recordRoot }] = await Promise.all([
      //       apis.racetrack
      //         .getList({ name: recordMeta.racetrackName })
      //         .then(res => res?.data?.[0]?.id),
      //       // TODO 查询载具
      //       apis.path.getInfo().then(res => res.data!),
      //     ]);

      //     const {
      //       totalTime,
      //       minCycleTime,
      //       maxSpeed,
      //       avgSpeed,
      //       avgCycleTime,
      //       cycleNum,
      //     } = utils.record.parseData(content);
      //     const filename = `${fileSize}.xld`;

      //     await FileSystem.writeFile(`${recordRoot}/${filename}`, content);
      //     const fileHash = await FileSystem.hash(
      //       `${recordRoot}/${filename}`,
      //       'MD5',
      //     );

      //     const { errCode, data } = await apis.record.save({
      //       ...recordMeta,
      //       totalTime,
      //       minCycleTime,
      //       maxSpeed,
      //       avgSpeed,
      //       avgCycleTime,
      //       cycleNum,
      //       fileHash,
      //       fileSize,
      //       fileId: filename,
      //       racetrackId,
      //       startDate: +dayjs(startDate, 'MM-DD-YYYY HH:mm:ss'),
      //     });

      //     if (!errCode && data) {
      //       console.log(data);
      //     }
      //   }),
      // );
    })();

    return () => {
      subscription.remove();
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
                key={device.id}
                iconRight
                size="lg"
                color="#fff"
                buttonStyle={[
                  styles.deviceItem,
                  !!idx && styles.deviceItemNotFirst,
                ]}
                title={<Text>{device.name}</Text>}
                icon={
                  <PersonalHotspotCircleFill
                    color={device.connected ? primaryColor : '#D1D1D6'}
                    style={styles.deviceItemIcon}
                  />
                }
                onPress={async () => {
                  try {
                    if (!device.connected) {
                      await BleManager.connect(device.id);
                      await AsyncStorage.setItem(
                        AsyncStorageKey.LAST_CONNECTED_BLE_DEVICE_ID,
                        device.id,
                      );
                    }
                    eventBus.emit(EventName.BLE_DEVICE_CONNECTED, device);
                    navigation.goBack();
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
