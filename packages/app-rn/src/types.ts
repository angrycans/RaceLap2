import type { ParamListBase } from '@react-navigation/native';
import type { RouteName } from './constants';
import type { User } from '@race-lap/app-helper';

export interface RootStackParamList extends ParamListBase {
  [RouteName.STARTUP]: undefined;
  [RouteName.USER_AGREEMENT]: undefined;
  [RouteName.HOME]: undefined;
  [RouteName.CONNECT_DEVICE]: undefined;
  [RouteName.RECORD_DETAIL]: undefined;
  [RouteName.NEW_RACETRACK]: undefined;
  [RouteName.SET_DRIVER_NAME]: undefined;
  [RouteName.SELECT_CARRIER]: undefined;
  [RouteName.SELECT_RACETRACK]: { id: number | null };
  [RouteName.SETTING]: undefined;
  [RouteName.RACETRACK_DETAIL]: {
    /** 标题 */
    title: string;
  };
}

export interface AppContext {
  /** 当前用户信息 */
  auth: User | null;
  /** 更新 ctx */
  update?: React.Dispatch<React.SetStateAction<AppContext>>;
}

export { RouteName };
