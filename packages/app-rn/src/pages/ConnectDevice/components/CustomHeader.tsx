import React, { type FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { Text } from '@/components';
import { useNavigation } from '@react-navigation/native';

export const CustomHeader: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Button
        type="clear"
        containerStyle={styles.backBtn}
        title={<Text color="#fff">返回</Text>}
        icon={<Icon type="antdesign" color="#fff" name="left" size={22} />}
        onPress={() => navigation.goBack()}
      />
      <Text bold color="#fff">
        配对
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
