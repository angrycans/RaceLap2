import type { HeaderBackButtonProps } from '@react-navigation/elements';
import React, { type FC, useState, useRef, useMemo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from '@rneui/themed';
import { useNavigation } from '@/hooks';
import { Navigator, FocusAwareStatusBar } from '@/components';

export const SetDriverName: FC = () => {
  const [carrierName, setCarrierName] = useState('');
  const navigationRef = useRef(useNavigation());
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
            disabled={!carrierName.length}
            title="完成"
            onPress={() => {
              console.log('carrierName -->', carrierName);
            }}
          />
        );
      },
    }),
    [carrierName],
  );

  return (
    <>
      <FocusAwareStatusBar barStyle="light-content" />
      <Navigator
        title="载具"
        headerLeft={HeaderLeft}
        headerRight={HeaderRight}
      />
      <View style={styles.wrapper}>
        <TextInput
          placeholder="请输入载具型号/品牌"
          placeholderTextColor="#C7C7CC"
          style={styles.input}
          value={carrierName}
          onChangeText={setCarrierName}
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
