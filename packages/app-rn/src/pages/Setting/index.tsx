import React, { type FC } from 'react';
import { View, Text } from 'react-native';
import { FocusAwareStatusBar } from '@/components';

export const Setting: FC = () => {
  return (
    <View>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text>Setting</Text>
    </View>
  );
};

export default Setting;
