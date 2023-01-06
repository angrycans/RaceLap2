import { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import {
  syncWebBundle,
  initDB,
  initAMap,
  initLinking,
  initBle,
  requestCommonPermissions,
} from '../tasks';
import { useNavigation } from './useNavigation';
import { RouteName } from '../constants';

export function useInit() {
  const navigationRef = useRef(useNavigation());
  useEffect(() => {
    requestCommonPermissions()
      .then(() => {
        syncWebBundle();
        initDB();
        initAMap();
      })
      .catch(() => {
        if (Platform.OS === 'android') {
          BackHandler.exitApp();
        }
      });
    const unsubscribe = initLinking({
      navigateToDetail(id) {
        navigationRef.current.navigate({
          name: RouteName.RECORD_DETAIL,
          params: { id },
          key: `${RouteName.RECORD_DETAIL}-${Date.now()}-${id}`,
        });
      },
    });
    const initBleUnsubscribe = initBle();
    return () => {
      unsubscribe();
      initBleUnsubscribe();
    };
  }, []);
}

export default useInit;
