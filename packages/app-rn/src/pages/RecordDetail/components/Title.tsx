import React, { type FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
}

export const Title: FC<Props> = props => {
  const { title, subtitle } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 28,
    marginLeft: 6,
    color: '#aeaeb2',
  },
});

export default Title;
