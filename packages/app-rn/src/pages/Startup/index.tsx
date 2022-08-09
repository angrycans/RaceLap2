import React, { type FC } from 'react';
import {
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Button, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, FocusAwareStatusBar } from '@/components';
import { bodyTextStyle } from '@/theme';
import { useNavigation } from '@/hooks';
import { RouteName, AsyncStorageKey } from '@/constants';

export const Startup: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/bg_startup.png')}
        resizeMode="cover"
        style={styles.bgImage}>
        <SafeAreaView style={styles.contentWrapper}>
          <StatusBar barStyle="light-content" />
          <View style={styles.logoWrapper}>
            <Image
              resizeMode="contain"
              style={styles.logoImg}
              source={require('../../assets/images/logo.png')}
            />
            <Image
              resizeMode="contain"
              style={styles.logoText}
              source={require('../../assets/images/logo-text.png')}
            />
          </View>
          <View style={styles.actionWrapper}>
            <Button
              title="同意并进入"
              icon={<Icon name="home" color="white" />}
              size="lg"
              titleStyle={styles.btnTitle}
              buttonStyle={styles.btn}
              onPress={async () => {
                await AsyncStorage.setItem(
                  AsyncStorageKey.IS_AGRESS_USER_AGREEMENT,
                  '1',
                );
                navigation.popToTop();
              }}
            />
            <Text style={styles.tips}>进入表示同意用户协议</Text>
            <Button
              type="clear"
              title="查看用户协议"
              onPress={() => {
                navigation.navigate(RouteName.USER_AGREEMENT);
              }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    marginTop: 120,
    alignItems: 'center',
  },
  logoImg: {
    width: 144,
    height: 144,
  },
  logoText: {
    marginTop: 24,
    width: 160,
    height: 48,
  },
  actionWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    // backgroundColor: '#ffffff',
    marginBottom: 24,
    marginHorizontal: 24,
  },
  btn: {
    height: 52,
    borderRadius: 14,
  },
  btnTitle: {
    ...bodyTextStyle,
    marginLeft: 12,
  },
  tips: {
    ...bodyTextStyle,
    textAlign: 'center',
    color: '#fff',
    marginTop: 48,
  },
});

export default Startup;
