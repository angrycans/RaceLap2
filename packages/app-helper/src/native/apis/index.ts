import * as racetrack from './racetrack';
import * as user from './user';
import * as record from './record';
import * as path from './path';

type NSRacetrack = typeof racetrack;
type NSUser = typeof user;
type NSRecord = typeof record;
type NSPath = typeof path;


export {
  user,
  racetrack,
  record,
  path
}

export type {
  NSRacetrack,
  NSUser,
  NSRecord,
  NSPath
}
