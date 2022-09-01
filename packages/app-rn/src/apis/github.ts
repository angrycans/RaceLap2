interface Release {
  /** release 名称 */
  name: string;
  /** 资源 */
  assets: {
    /** 资源名称 */
    name: string;
    /** 资源大小 */
    size: number;
    /** 下载地址 */
    browser_download_url: string;
  }[];
}

/**
 * 获取当前最新 release
 */
export function getLatestRelease(): Promise<Release> {
  return fetch(
    'https://api.github.com/repos/angrycans/RaceLap2/releases/latest',
  ).then(res => res.json());
}
