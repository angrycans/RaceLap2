import React, { type FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components';

interface Props {
  /** 标题 */
  title: string;
  /** 右侧图标 */
  icon?: ReactNode;
}

export const Title: FC<Props> = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} bold>
        {title}
      </Text>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 28,
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 4,
    fontSize: 18,
  },
});

export default Title;
