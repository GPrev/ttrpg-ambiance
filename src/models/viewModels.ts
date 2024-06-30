import { KeyedObject } from './basicTypes';

export interface Ambiance extends KeyedObject {
  name: string;
  background: Image;
  music: Audio;
  sounds: Audio[];
}

export interface Playlist extends KeyedObject {
  name: string;
  ambiances: Ambiance[];
}

export interface ImageSource extends KeyedObject {
  name: string;
  url: string;
}

export interface Image {
  source: ImageSource | null;
  mirroredHorizontally: boolean;
}

export interface AudioSource extends KeyedObject {
  name: string;
  url: string;
  volume: number;
}

export interface Audio {
  source: AudioSource | null;
  volume: number;
}
