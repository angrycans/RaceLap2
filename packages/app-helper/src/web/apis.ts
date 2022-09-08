import type { NSRacetrack, NSUser, NSRecord, NSPath } from '../native/apis';

export interface Apis {
  /** 赛道 */
  racetrack: NSRacetrack;
  /** 用户 */
  user: NSUser;
  /** 比赛记录 */
  record: NSRecord;
  /** 路径 */
  path: NSPath;
};
