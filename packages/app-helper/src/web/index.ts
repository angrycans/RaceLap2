import type { NSRacetrack, BridgeFS } from './apis';
import { createBridge } from './bridge';

export interface Apis {
  /** 赛道 */
  racetrack: NSRacetrack;
};

export const apis = createBridge({}) as any as Apis;
export const fs = createBridge({}) as any as BridgeFS;
