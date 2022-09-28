import React, {
  type FC,
  type PropsWithChildren,
  useState,
  useMemo,
} from 'react';
import { useMount } from 'ahooks';
import { getAuthInfo } from '@/utils';
import { Provider, defaultContextValue } from './context';

export const AppProvider: FC<PropsWithChildren> = props => {
  const [ctx, setCtx] = useState(defaultContextValue);
  const ctxVal = useMemo(
    () => ({
      ...ctx,
      update: setCtx,
    }),
    [ctx],
  );

  useMount(async () => {
    try {
      const nextAuthInfo = await getAuthInfo();

      if (nextAuthInfo) {
        setCtx(appCtx => ({
          ...appCtx,
          auth: nextAuthInfo,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  });

  return <Provider value={ctxVal}>{props.children}</Provider>;
};

export default AppProvider;
