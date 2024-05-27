export interface Ambiance {
  name: string;
  backgournd: Image;
  music: Audio;
  sounds: Audio[];
}
export type AmbianceDict = { [key:string]: Ambiance };

export interface Playlist {
  name: string;
  ambiances: Ambiance[];
}
export type PlaylistDict = { [key:string]: Playlist };

export interface ImageSource {
  name: string;
  url: string
}
export type ImageSourceDict = { [key:string]: ImageSource };

export interface Image {
  source: ImageSource
}
export type ImageDict = { [key:string]: Image };

export interface AudioSource {
  name: string;
  url: string;
  volume: string;
}
export type AudioSourceDict = { [key:string]: AudioSource };

export interface Audio {
  source: AudioSource;
  volume: string;
}
export type AudioDict = { [key:string]: Audio };
