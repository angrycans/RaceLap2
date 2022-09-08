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
        navigationRef.current.navigate(RouteName.RECORD_DETAIL, { id });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);
}

export default useInit;
