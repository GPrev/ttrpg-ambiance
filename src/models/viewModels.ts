import { KeyedObject, NamedObject } from './basicTypes';

export interface Ambiance extends KeyedObject, NamedObject {
  background: Image;
  music: Audio;
  sounds: Audio[];
}

export interface Playlist extends KeyedObject, NamedObject {
  ambiances: Ambiance[];
}

export interface ImageSource extends KeyedObject, NamedObject {
  url: string;
}

export interface Image {
  source: ImageSource | null;
  mirroredHorizontally: boolean;
}

export interface AudioSource extends KeyedObject, NamedObject {
  url: string;
  volume: number;
}

export interface Audio {
  source: AudioSource | null;
  volume: number;
}
