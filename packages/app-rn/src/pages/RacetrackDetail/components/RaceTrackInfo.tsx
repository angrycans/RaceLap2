import React, { type FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Text } from '@/components';
import { MappinAndEllipse } from '@/components/Icons/MonoIcons';

export const RaceTrackInfo: FC = () => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.reaceTrackImg}
        source={{
          uri: 'https://www.kindacode.com/wp-content/uploads/2022/03/blue-sky.jpeg',
        }}
      />
      <View style={[styles.row, styles.infoTextWrapper]}>
        <MappinAndEllipse width={22} color="#000" />
        <Text
          size={13}
          height={18}
          numberOfLines={1}
          style={styles.reaceTrackName}>
          江宁区梅龙路与马家塘路交叉路口往北约2000000米米米
        </Text>
        <Button
          iconRight
          type="clear"
          buttonStyle={styles.goLocationBtn}
          title={
            <Text style={styles.goLocationText} size={13} height={18}>
              前往
            </Text>
          }
          icon={<Icon type="font-awesome" size={18} name="location-arrow" />}
        />
      </View>
    </View>
  );
};

export default RaceTrackInfo;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  reaceTrackImg: {
    height: 154,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTextWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  reaceTrackName: {
    flex: 1,
    marginLeft: 4,
  },
  goLocationBtn: {
    padding: 0,
    paddingHorizontal: 0,
  },
  goLocationText: {
    marginRight: 4,
  },
});
