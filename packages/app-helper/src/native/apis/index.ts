import * as racetrack from './racetrack';
import * as user from './user';
import * as record from './record';

type NSRacetrack = typeof racetrack;
type NSUser = typeof user;
type NSRecord = typeof record;


export {
  user,
  racetrack,
  record,
}

export type {
  NSRacetrack,
  NSUser,
  NSRecord
}
