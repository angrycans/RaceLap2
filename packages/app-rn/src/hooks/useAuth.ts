import { useContext, useRef, useCallback } from 'react';
import { appContext } from '@/context';
import { getAuthInfo } from '@/utils';

/** 获取当前用户的 auth */
export function useAuth() {
  const { auth, update } = useContext(appContext);
  const updateRef = useRef(update);
  updateRef.current = update;

  const refresh = useCallback(async () => {
    try {
      const nextAuth = await getAuthInfo();
      if (nextAuth) {
        updateRef.current?.(appCtx => ({
          ...appCtx,
          auth: nextAuth,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { auth, refresh };
}

export default useAuth;
