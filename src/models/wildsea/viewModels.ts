import { KeyedObject } from '../basicTypes';

export interface WildseaTrack extends KeyedObject {
  name: string;
  length: number;
  progress: number;
  burn: number;
}

export interface WildseaTracklist extends KeyedObject {
  name: string;
  tracks: WildseaTrack[];
}
