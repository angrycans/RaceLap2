import type { HeaderBackButtonProps } from '@react-navigation/elements';
import React, { type FC, useState, useRef, useMemo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { apis } from '@race-lap/app-helper/dist/native';
import { useNavigation, useAuth } from '@/hooks';
import { Navigator, FocusAwareStatusBar } from '@/components';

export const SetDriverName: FC = () => {
  const [driverName, setDriverName] = useState('');
  const navigationRef = useRef(useNavigation());
  const { refresh } = useAuth();
  const { HeaderLeft, HeaderRight } = useMemo(
    () => ({
      HeaderLeft() {
        return (
          <Button
            type="clear"
            title="取消"
            onPress={() => navigationRef.current.goBack()}
          />
        );
      },
      HeaderRight(_: HeaderBackButtonProps) {
        return (
          <Button
            type="clear"
            disabled={!driverName.length}
            title="完成"
            onPress={async () => {
              await apis.user.save({ name: driverName });
              await refresh();
              navigationRef.current.goBack();
            }}
          />
        );
      },
    }),
    [driverName, refresh],
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" />
      <Navigator
        title="车手"
        headerLeft={HeaderLeft}
        headerRight={HeaderRight}
      />
      <View style={styles.wrapper}>
        <TextInput
          placeholder="请输入车手名称"
          placeholderTextColor="#C7C7CC"
          style={styles.input}
          value={driverName}
          onChangeText={setDriverName}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default SetDriverName;
