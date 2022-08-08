import React, { type FC } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { Text } from '@/components';
import { PersonCropCircle, Bicycle } from '@/components/Icons/MonoIcons';

interface Props {
  style?: ViewStyle;
}

export const Title: FC<Props> = props => {
  const { style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.row}>
        <ImageBackground
          style={styles.racetrack}
          source={{
            uri: 'https://www.kindacode.com/wp-content/uploads/2022/03/blue-sky.jpeg',
          }}>
          <Text numberOfLines={1} style={styles.racetrackName}>
            聚宝山赛车场
          </Text>
        </ImageBackground>
        <View style={styles.userInfo}>
          <View style={[styles.row, styles.userInfoItem]}>
            <PersonCropCircle width={24} />
            <Text
              color="primary"
              bold
              numberOfLines={1}
              style={styles.userInfoItemText}>
              王大虫
            </Text>
          </View>
          <View style={[styles.row, styles.userInfoItem]}>
            <Bicycle width={24} />
            <Text
              color="primary"
              bold
              numberOfLines={1}
              style={styles.userInfoItemText}>
              GX200
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.overview]}>
        <View style={styles.overviewItem}>
          <Text bold style={styles.overviewItemValue}>
            00:08:23
          </Text>
          <Text style={styles.overviewItemLabel}>总成绩</Text>
        </View>
        <View style={styles.overviewItem}>
          <View style={[styles.row, styles.overviewItemValueWithUnit]}>
            <Text bold style={styles.overviewItemValue}>
              89.9
            </Text>
            <Text style={styles.overviewItemUnit}>mph</Text>
          </View>
          <Text style={styles.overviewItemLabel}>最大速度</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text bold color="#FF9500" style={styles.overviewItemValue}>
            00:08:23
          </Text>
          <Text style={styles.overviewItemLabel}>最短圈时</Text>
        </View>
      </View>
      <View style={[styles.row, styles.overview]}>
        <View style={styles.overviewItem}>
          <Text bold style={styles.overviewItemValue}>
            4
          </Text>
          <Text style={styles.overviewItemLabel}>圈数</Text>
        </View>
        <View style={styles.overviewItem}>
          <View style={[styles.row, styles.overviewItemValueWithUnit]}>
            <Text bold style={styles.overviewItemValue}>
              50.1
            </Text>
            <Text style={styles.overviewItemUnit}>mph</Text>
          </View>
          <Text style={styles.overviewItemLabel}>平均速度</Text>
        </View>
        <View style={styles.overviewItem}>
          <Text bold style={styles.overviewItemValue}>
            1:32.98
          </Text>
          <Text style={styles.overviewItemLabel}>平均圈时</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  racetrack: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  racetrackName: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    padding: 10,
    textAlign: 'center',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
  },
  userInfoItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  userInfoItemText: {
    paddingLeft: 8,
  },
  overview: {
    marginTop: 12,
  },
  overviewItem: {
    flex: 1,
  },
  overviewItemValue: {
    textAlign: 'center',
  },
  overviewItemValueWithUnit: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewItemUnit: {
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 4,
    color: '#8E8E93',
  },
  overviewItemLabel: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 11,
    lineHeight: 12,
  },
});

export default Title;
