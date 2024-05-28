export interface AmbianceData {
  name: string;
  background: ImageData;
  music: AudioData;
  sounds: AudioData[];
}

export interface PlaylistData {
  name: string;
  ambiances: string[];
}

export interface ImageSourceData {
  name: string;
  url: string;
}

export interface ImageData {
  source: string;
}

export interface AudioSourceData {
  name: string;
  url: string;
  volume: number;
}

export interface AudioData {
  source: string;
  volume: number;
}
