import * as racetrack from './racetrack';
import * as user from './user';
import * as record from './record';
import * as path from './path';
import * as carrier from './carrier';

type NSRacetrack = typeof racetrack;
type NSUser = typeof user;
type NSRecord = typeof record;
type NSPath = typeof path;
type NSCarrier = typeof carrier;

export {
  user,
  racetrack,
  record,
  path,
  carrier
}

export type {
  NSRacetrack,
  NSUser,
  NSRecord,
  NSPath,
  NSCarrier
}
