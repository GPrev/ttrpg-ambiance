import { KeyedObject } from './basicTypes';

export interface Ambiance extends KeyedObject {
  name: string;
  background: Image | null;
  music: Audio | null;
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
  source: ImageSource;
  mirroredHorizontally: boolean;
}

export interface AudioSource extends KeyedObject {
  name: string;
  url: string;
  volume: number;
}

export interface Audio {
  source: AudioSource;
  volume: number;
}
