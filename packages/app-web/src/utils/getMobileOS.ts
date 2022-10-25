import MobileDetect from 'mobile-detect';

const md = new MobileDetect(navigator.userAgent);

type MobileOS =
  | 'AndroidOS'
  | 'iOS';

/**
 * 判断移动端环境
 */
export function getMobileOS(): MobileOS {
  return md.os() as MobileOS;
}

export default getMobileOS;
