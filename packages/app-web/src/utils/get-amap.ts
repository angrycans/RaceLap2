import AMapLoader from '@amap/amap-jsapi-loader';
import type { AMapType } from "@amap/amap-jsapi-types";

declare global {
  interface Window {
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
  }
}
// 49e08df0f0213da9019de70ab1149e9e
window._AMapSecurityConfig = {
  // serviceHost: '您的代理服务器域名或地址/_AMapService',
  // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
  securityJsCode: '49e08df0f0213da9019de70ab1149e9e'
}

let AMapLoadTask: Promise<AMapType> | null = null

/**
 * 获取 AMap 实例
 */
export function getAMap(): Promise<AMapType> {
  if (!AMapLoadTask) {
    AMapLoadTask = AMapLoader.load({
      // 申请好的Web端开发者Key，首次调用 load 时必填
      key: 'fe497d9258515e01a1ea56aaae37c36b',
      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      version: '2.0',
      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      plugins: [
        'AMap.Geolocation',
        'AMap.AutoComplete'
      ],
    })
  }

  return AMapLoadTask;
}

export default getAMap;


