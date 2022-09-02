import * as racetrack from './racetrack';
import * as user from './user';

type NSRacetrack = typeof racetrack;
type NSUser = typeof user;

export {
  user,
  racetrack,
}

export type {
  NSRacetrack,
  NSUser
}
