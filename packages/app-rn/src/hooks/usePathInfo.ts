import { useState } from 'react';
import { useMount } from 'ahooks';
import type { PathInfo } from '@race-lap/app-helper/dist/native/apis/path';
import { apis } from '@race-lap/app-helper/dist/native';

/**
 * 获取路径信息
 */
export function usePathInfo() {
  const [pathInfo, setPathInfo] = useState<PathInfo | null>(null);

  useMount(async () => {
    const { errCode, data } = await apis.path.getInfo();
    if (!errCode && data) {
      setPathInfo(data);
    }
  });

  return pathInfo;
}

export default usePathInfo;
