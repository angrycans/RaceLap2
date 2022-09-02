import { useContext, useRef, useCallback } from 'react';
import { appContext } from '@/context';
import { apis } from '@race-lap/app-helper/dist/native';

/** 获取当前用户的 auth */
export function useAuth() {
  const { auth, update } = useContext(appContext);
  const updateRef = useRef(update);
  updateRef.current = update;

  const refresh = useCallback(async () => {
    const { errCode, errMsg, data } = await apis.user.getList();
    if (errCode) {
      console.error(errMsg);
      return;
    }

    const nextAuthInfo = data?.[0];
    if (nextAuthInfo) {
      updateRef.current?.(appCtx => ({
        ...appCtx,
        auth: nextAuthInfo,
      }));
    }
  }, []);

  return { auth, refresh };
}

export default useAuth;
