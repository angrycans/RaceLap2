import React, {
  type FC,
  type PropsWithChildren,
  useState,
  useMemo,
} from 'react';
import { useMount } from 'ahooks';
import { apis } from '@race-lap/app-helper/dist/native';
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
    const { errCode, errMsg, data } = await apis.user.getList();
    if (errCode) {
      console.error(errMsg);
      return;
    }

    const nextAuthInfo = data?.[0];
    if (nextAuthInfo) {
      setCtx(appCtx => ({
        ...appCtx,
        auth: nextAuthInfo,
      }));
    }
  });

  return <Provider value={ctxVal}>{props.children}</Provider>;
};

export default AppProvider;
