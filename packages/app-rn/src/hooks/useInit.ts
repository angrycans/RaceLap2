import { useEffect, useRef } from 'react';
import { syncWebBundle, initDB, initAMap, initLinking } from '../tasks';
import { useNavigation } from './useNavigation';
import { RouteName } from '../constants';

export function useInit() {
  const navigationRef = useRef(useNavigation());
  useEffect(() => {
    syncWebBundle();
    initDB();
    initAMap();
    const unsubscribe = initLinking({
      navigateToDetail(id) {
        navigationRef.current.navigate({
          name: RouteName.RECORD_DETAIL,
          params: { id },
          key: `${RouteName.RECORD_DETAIL}-${Date.now()}-${id}`,
        });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);
}

export default useInit;
