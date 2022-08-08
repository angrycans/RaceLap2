import type { RouteName } from './constants';
import type { ParamListBase } from '@react-navigation/native';

export interface RootStackParamList extends ParamListBase {
  [RouteName.STARTUP]: undefined;
  [RouteName.USER_AGREEMENT]: undefined;
  [RouteName.HOME]: undefined;
  [RouteName.CONNECT_DEVICE]: undefined;
  [RouteName.RECORD_DETAIL]: undefined;
  [RouteName.RACETRACK_DETAIL]: {
    /** 标题 */
    title: string;
  };
}

export { RouteName };
