import type { NSRacetrack, NSUser, NSRecord } from '../native/apis';

export interface Apis {
  /** 赛道 */
  racetrack: NSRacetrack;
  /** 用户 */
  user: NSUser;
  /** 记录 */
  record: NSRecord
};
