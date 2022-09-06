import React, { type FC, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import WifiManager from 'react-native-wifi-reborn';
import { useNavigation } from '@react-navigation/native';
import { useMount } from 'ahooks';
import { Text, FocusAwareStatusBar } from '@/components';
import { PersonalHotspotCircleFill } from '@/components/Icons/MonoIcons';
import CustomHeader from './components/CustomHeader';
import LoopCircle from './components/LoopCircle';

interface Device {}

export const ConnectDevice: FC = () => {
  const navigation = useNavigation();
  const [deviceList] = useState<Device[]>([]);
  useMount(async () => {
    // WifiManager.

    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Your current connected wifi SSID is ' + ssid);
      },
      err => {
        console.log('Cannot get current SSID!!~=');
        console.log(err);
      },
    );

    // console.log('WifiManager --->', WifiManager);

    // console.log(
    //   'connectToProtectedSSIDPrefix --->',
    //   connectToProtectedSSIDPrefix,
    // );

    // await WifiManager.connectToProtectedSSIDPrefix(
    //   'RaceLap',
    //   '88888888',
    //   false,
    // );
  });

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
            {Array.from({ length: 3 }, (_, idx) => (
              <Button
                key={idx}
                iconRight
                size="lg"
                color="#fff"
                buttonStyle={[
                  styles.deviceItem,
                  !!idx && styles.deviceItemNotFirst,
                ]}
                title={<Text>RaceLaper-13u49af{idx}</Text>}
                icon={
                  <PersonalHotspotCircleFill
                    color="#D1D1D6"
                    style={styles.deviceItemIcon}
                  />
                }
                onPress={() => navigation.goBack()}
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
