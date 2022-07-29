import React, { type FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, useTheme } from '@rneui/themed';
import { Text } from '@/components';
import { useNavigation } from '@/hooks';
import { RouteName } from '@/constants';
import Title from './Title';

export const DriverAndDevice: FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <Title title="车手和设备" icon={<Icon name="settings" />} />
      <View style={styles.cardWrapper}>
        <View style={styles.row}>
          <Button
            containerStyle={styles.btn}
            color="#F2F2F7"
            icon={
              <Icon
                type="font-awesome"
                color={theme.colors.primary}
                name="user-circle-o"
                size={17}
              />
            }
            title={
              <Text style={styles.btnTitle} color="primary" bold>
                未命名车手
              </Text>
            }
          />
          <Button
            containerStyle={{ ...styles.btn, ...styles.btnNotFirst }}
            color="#F2F2F7"
            icon={
              <Icon
                type="antdesign"
                color={theme.colors.primary}
                name="questioncircleo"
                size={17}
              />
            }
            title={
              <Text style={styles.btnTitle} color="primary" bold>
                未选择载具
              </Text>
            }
          />
        </View>
        <View style={{ ...styles.row, ...styles.overview }}>
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
        <View style={{ ...styles.row, ...styles.recorderTitle }}>
          <Icon color="#FF9500" type="entypo" name="stopwatch" size={17} />
          <Text color="#FF9500" style={styles.recorderTitleText}>
            记录仪
          </Text>
        </View>
        <View style={{ ...styles.row, ...styles.connectDeviceBtnWrapper }}>
          <Button
            color="#F2F2F7"
            icon={
              <Icon
                color={theme.colors.primary}
                type="antdesign"
                name="pluscircleo"
                size={17}
              />
            }
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
    marginLeft: 10,
  },
  overview: {
    justifyContent: 'flex-start',
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
