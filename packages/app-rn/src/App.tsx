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
import RacetrackDetail from './pages/RacetrackDetail';
import NewRacetrack from './pages/NewRacetrack';
import SetDriverName from './pages/SetDriverName';
import SelectCarrier from './pages/SelectCarrier';
import SelectRacetrack from './pages/SelectRacetrack';
import Setting from './pages/Setting';

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

const shareBtnStyle = { paddingRight: 0 };

const App: FC = () => {
  return (
    <ThemeProvider theme={rneuiTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator>
          <Stack.Group
            screenOptions={{
              headerBackTitle: '返回',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#e5e5e5',
              },
            }}>
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
              options={{
                title: '用户协议',
                headerShadowVisible: true,
                headerStyle: {
                  backgroundColor: '#fff',
                },
              }}
              name={RouteName.USER_AGREEMENT}
              component={UserAgreement}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={RouteName.CONNECT_DEVICE}
              component={ConnectDevice}
            />
            <Stack.Screen
              options={{ title: '设置' }}
              name={RouteName.SETTING}
              component={Setting}
            />
            <Stack.Screen
              options={{
                title: '',
                headerRight({ tintColor }) {
                  return (
                    <Button
                      type="clear"
                      buttonStyle={shareBtnStyle}
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
              name={RouteName.RACETRACK_DETAIL}
              component={RacetrackDetail}
            />
            <Stack.Screen
              options={{
                title: '记录',
                headerRight({ tintColor }) {
                  // console.log('props -->>', props);
                  return (
                    <Button
                      type="clear"
                      buttonStyle={shareBtnStyle}
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
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: '#e5e5e5',
              },
            }}>
            <Stack.Screen
              options={{
                presentation: 'fullScreenModal',
              }}
              name={RouteName.NEW_RACETRACK}
              component={NewRacetrack}
            />
            <Stack.Screen
              name={RouteName.SET_DRIVER_NAME}
              component={SetDriverName}
            />
            <Stack.Screen
              name={RouteName.SELECT_CARRIER}
              component={SelectCarrier}
            />
            <Stack.Screen
              name={RouteName.SELECT_RACETRACK}
              component={SelectRacetrack}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
