export interface Ambiance {
  key: string | null;
  name: string;
  background: Image | null;
  music: Audio | null;
  sounds: Audio[];
}

export interface Playlist {
  key: string | null;
  name: string;
  ambiances: Ambiance[];
}

export interface ImageSource {
  key: string | null;
  name: string;
  url: string;
}

export interface Image {
  source: ImageSource;
}

export interface AudioSource {
  key: string | null;
  name: string;
  url: string;
  volume: number;
}

export interface Audio {
  source: AudioSource;
  volume: number;
}
