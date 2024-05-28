export interface AmbianceData {
  name: string;
  background: ImageData;
  music: AudioData;
  sounds: AudioData[];
}
export type AmbianceDataDict = { [key:string]: AmbianceData };

export interface PlaylistData {
  name: string;
  ambiances: string[];
}
export type PlaylistDataDict = { [key:string]: PlaylistData };

export interface ImageSourceData {
  name: string;
  url: string
}
export type ImageSourceDataDict = { [key:string]: ImageSourceData };

export interface ImageData {
  source: string
}
export type ImageDataDict = { [key:string]: ImageData };

export interface AudioSourceData {
  name: string;
  url: string;
  volume: string;
}
export type AudioSourceDataDict = { [key:string]: AudioSourceData };

export interface AudioData {
  source: string;
  volume: string;
}
export type AudioDataDict = { [key:string]: AudioData };
