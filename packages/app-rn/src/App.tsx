/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { type FC } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, createTheme, Icon, Button } from '@rneui/themed';
import { RouteName } from './constants';
import Startup from './pages/Startup';
import UserAgreement from './pages/UserAgreement';
import Home from './pages/Home';
import ConnectDevice from './pages/ConnectDevice';
import RecordDetail from './pages/RecordDetail';

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#e5e5e5',
  },
};

const rneuiTheme = createTheme({
  lightColors: {
    primary: '#007AFF',
  },
  darkColors: {},
});

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <ThemeProvider theme={rneuiTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerBackTitle: '返回' }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={RouteName.HOME}
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={RouteName.STARTUP}
            component={Startup}
          />
          <Stack.Screen
            options={{ title: '用户协议' }}
            name={RouteName.USER_AGREEMENT}
            component={UserAgreement}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={RouteName.CONNECT_DEVICE}
            component={ConnectDevice}
          />
          <Stack.Screen
            options={{
              title: '记录',
              headerRight({ tintColor }) {
                // console.log('props -->>', props);
                return (
                  <Button
                    type="clear"
                    buttonStyle={{ paddingRight: 0 }}
                    icon={
                      <Icon
                        type="entypo"
                        name="share-alternative"
                        color={tintColor}
                        size={20}
                      />
                    }
                  />
                );
              },
            }}
            name={RouteName.RECORD_DETAIL}
            component={RecordDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
