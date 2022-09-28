import React, { type FC } from 'react';
import { View, Text } from 'react-native';
import { FocusAwareStatusBar } from '@/components';

export const UserAgreement: FC = () => {
  return (
    <View>
      <FocusAwareStatusBar barStyle="dark-content" />
      <Text>UserAgreement</Text>
    </View>
  );
};

export default UserAgreement;
