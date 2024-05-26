interface ambiance {
  backgournd: image;
  music: audio;
  sounds: audio[];
}

interface imageSource {
  url: string
}

interface image {
  source: imageSource
}

interface audioSource {
  url: string;
  volume: string;
}

interface audio {
  source: audioSource;
  volume: string;
}

export { ambiance, image, imageSource, audio, audioSource }
