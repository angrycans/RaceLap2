import React, { useEffect, useMemo, type FC } from 'react';
import { View, StyleSheet, ActionSheetIOS } from 'react-native';
import { Icon, Button } from '@rneui/themed';
import WifiManager from 'react-native-wifi-reborn';
import { useRequest } from 'ahooks';
import { Text, Row } from '@/components';
import {
  ClrWifi1,
  ClrWifi2,
  ClrWifi3,
  ClrBattery0,
  ClrBattery25,
  ClrBattery50,
  ClrBattery75,
  ClrBattery100,
} from '@/components/Icons/ColoredIcons/ic';
import {
  ArrowUpAndDownCircleFill,
  PersonCropCircle,
  QuestionmarkCircle,
  PlusCircle,
} from '@/components/Icons/MonoIcons';
import { useNavigation, useAuth, useDeviceInfo } from '@/hooks';
import { RouteName } from '@/constants';
import { utils } from '@race-lap/app-helper';
import Title from './Title';
import { apis } from '@race-lap/app-helper/dist/native';

const { Col } = Row;

const gpsIconMap = {
  33: ClrWifi1,
  66: ClrWifi2,
  100: ClrWifi3,
};

const gpsStatusTextMap = {
  33: '差 ',
  66: '一般',
  100: '好',
};

const batteryIconMap = {
  0: ClrBattery0,
  25: ClrBattery25,
  50: ClrBattery50,
  75: ClrBattery75,
  100: ClrBattery100,
};

export const DriverAndDevice: FC = () => {
  const navigation = useNavigation();
  const deviceInfo = useDeviceInfo();
  const { auth } = useAuth();
  const { battery, BatteryIcon } = useMemo(() => {
    if (deviceInfo?.battery) {
      const batteryVal = (deviceInfo.battery * 100).toFixed(0);
      return {
        battery: batteryVal,
        BatteryIcon:
          batteryIconMap[
            utils.getNearestValue(+batteryVal, [0, 25, 50, 75, 100])
          ] || ClrBattery0,
      };
    } else {
      return {
        battery: '0',
        BatteryIcon: ClrBattery0,
      };
    }
  }, [deviceInfo?.battery]);

  const { gpsStatusText, GPSIcon } = useMemo(() => {
    if (deviceInfo?.gps) {
      const gpsVal = (deviceInfo.gps * 100).toFixed(0);
      const formatGPSVal = utils.getNearestValue(+gpsVal, [33, 66, 100]);
      return {
        gpsStatusText: gpsStatusTextMap[formatGPSVal],
        GPSIcon: gpsIconMap[formatGPSVal] || ClrWifi1,
      };
    } else {
      return {
        gpsStatusText: gpsStatusTextMap[33],
        GPSIcon: ClrBattery0,
      };
    }
  }, [deviceInfo?.gps]);
  const { data: racetrackListRes, run } = useRequest(apis.racetrack.getList, {
    manual: true,
  });
  const racetrackName = useMemo(
    () => racetrackListRes?.data?.[0]?.name || '',
    [racetrackListRes],
  );
  useEffect(() => {
    if (typeof deviceInfo?.racetrackId === 'number') {
      run({ id: deviceInfo!.racetrackId });
    }
  }, [deviceInfo, run]);

  return (
    <>
      <Title title="车手和设备" icon={<Icon name="settings" />} />
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <Button
            containerStyle={styles.btn}
            color="#F2F2F7"
            icon={<PersonCropCircle width={22} />}
            title={
              <Text style={styles.btnTitle} color="primary" bold>
                {auth?.name || '未命名车手'}
              </Text>
            }
            onPress={() =>
              !auth && navigation.navigate(RouteName.SET_DRIVER_NAME)
            }
          />
          <Button
            containerStyle={[styles.btn, styles.btnNotFirst]}
            color="#F2F2F7"
            icon={<QuestionmarkCircle width={22} />}
            title={
              <Text style={styles.btnTitle} color="primary" bold>
                {auth?.carrierName || '未选择载具'}
              </Text>
            }
            onPress={() => navigation.navigate(RouteName.SELECT_CARRIER)}
          />
        </View>
        <View style={[styles.row, styles.overview]}>
          <OverviewItem
            notFirst={false}
            title="公里"
            color="#FF2D55"
            value="0"
            unit="km"
          />
          <OverviewItem title="时间" color="#34C759" value="0" unit="min" />
          <OverviewItem title="次数" color="#32ADE6" value="0" />
          <OverviewItem title="赛道" color="#AF52DE" value="0" />
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <View style={[styles.row, styles.recorderTitle]}>
            <Icon color="#FF9500" type="entypo" name="stopwatch" size={17} />
            <Text color="#FF9500" style={styles.recorderTitleText}>
              记录仪
            </Text>
          </View>
          {deviceInfo && (
            <Button
              type="clear"
              buttonStyle={styles.recorderInfo}
              onPress={() => {
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ['关机', '取消配对', '取消'],
                    cancelButtonIndex: 2,
                    title: '请选择操作',
                  },
                  async idx => {
                    if (idx === 0) {
                      // 关机
                    } else if (idx === 1) {
                      // TODO: 目前无效 是否 只能关闭app内连接的 wifi
                      await WifiManager.disconnectFromSSID(deviceInfo.name);
                    }
                  },
                );
              }}>
              <Text color="#D1D1D6" style={styles.recorderName}>
                {deviceInfo.name}
              </Text>
              <Icon color="#34C759" type="feather" name="power" size={17} />
            </Button>
          )}
        </View>
        {deviceInfo ? (
          <Row style={styles.recorder}>
            <Col style={[styles.colItem, styles.colItemFirst]}>
              <Text style={styles.recorderDeviceInfoTitle}>GPS</Text>
              <View style={[styles.row, styles.recorderDeviceInfo]}>
                <GPSIcon />
                <Text style={styles.recorderDeviceInfoText}>
                  {gpsStatusText}
                </Text>
              </View>
            </Col>
            <Col style={[styles.colItem]}>
              <Text style={styles.recorderDeviceInfoTitle}>电量</Text>
              <View style={[styles.row, styles.recorderDeviceInfo]}>
                <BatteryIcon />
                <Text style={styles.recorderDeviceInfoText}>{battery}%</Text>
              </View>
            </Col>
            <Col style={[styles.colItem]}>
              <Text style={styles.recorderDeviceInfoTitle}>赛道</Text>
              <Button
                iconRight
                type="clear"
                buttonStyle={styles.racetrackSelectBtn}
                title={
                  <Text style={[styles.racetrack, styles.racetrackSelected]}>
                    {racetrackName || '请选择赛道'}
                  </Text>
                }
                icon={<ArrowUpAndDownCircleFill color="#AEAEB2" width={14} />}
                onPress={() =>
                  navigation.navigate(RouteName.SELECT_RACETRACK, {
                    id: deviceInfo.racetrackId,
                  })
                }
              />
            </Col>
          </Row>
        ) : (
          <View style={[styles.row, styles.connectDeviceBtnWrapper]}>
            <Button
              color="#F2F2F7"
              icon={<PlusCircle width={20} />}
              title={
                <Text style={styles.connectDeviceBtnTitle} color="primary">
                  连接设备
                </Text>
              }
              buttonStyle={styles.connectDeviceBtn}
              onPress={() => {
                navigation.navigate(RouteName.CONNECT_DEVICE);
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  btn: {
    flex: 1,
    borderRadius: 8,
  },
  btnNotFirst: {
    marginLeft: 12,
  },
  btnTitle: {
    marginLeft: 8,
  },
  overview: {
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  recorder: {
    marginTop: 12,
  },
  recorderTitle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recorderTitleText: {
    fontWeight: '500',
    marginLeft: 6,
  },
  connectDeviceBtnWrapper: {
    justifyContent: 'center',
  },
  connectDeviceBtn: {
    marginTop: 12,
    width: 130,
    height: 46,
    borderRadius: 8,
  },
  connectDeviceBtnTitle: {
    marginLeft: 10,
  },
  recorderInfo: {
    paddingHorizontal: 0,
    paddingRight: 2,
  },
  recorderName: {
    marginRight: 6,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
  },
  colItem: {
    paddingHorizontal: 16,
  },
  colItemFirst: {
    paddingLeft: 0,
  },
  recorderDeviceInfoTitle: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#000',
  },
  recorderDeviceInfo: {
    alignItems: 'center',
    height: 28,
  },
  recorderDeviceInfoText: {
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 13,
    color: '#8E8E93',
  },
  racetrackSelectBtn: {
    padding: 0,
    paddingHorizontal: 0,
  },
  racetrack: {
    fontWeight: '600',
    fontSize: 16,
    // lineHeight: 28,
    color: '#FF3B30',
  },
  racetrackSelected: {
    color: '#AF52DE',
  },
});

interface OverviewItemProps {
  /** 标题 */
  title: string;
  /** 颜色 */
  color: `#${string}`;
  /** 单位 */
  unit?: string;
  /** 单位 */
  value: string | number;
  /** 是否是第一个 */
  notFirst?: boolean;
}

const OverviewItem: FC<OverviewItemProps> = ({
  notFirst = true,
  title,
  color,
  unit,
  value,
}) => {
  return (
    <View style={itemStyles.container}>
      {notFirst && <View style={itemStyles.separator} />}
      <View
        style={Object.assign(
          {},
          itemStyles.wrapper,
          notFirst ? itemStyles.notFirst : {},
        )}>
        <Text style={itemStyles.title} color={color}>
          {title}
        </Text>
        <View style={itemStyles.row}>
          <Text style={itemStyles.value}>{value}</Text>
          {unit && <Text style={itemStyles.unit}>{unit}</Text>}
        </View>
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    paddingRight: 16,
  },
  separator: {
    width: 1,
    height: 46,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
  },
  notFirst: {
    paddingLeft: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
  },
  value: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
  },
  unit: {
    color: '#8E8E93',
    marginLeft: 4,
    marginTop: 9.5,
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 13,
  },
});

export default DriverAndDevice;
