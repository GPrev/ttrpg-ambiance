import { AmbianceData } from '../models/databaseModels';
import { Ambiance } from '../models/viewModels';
import { useAudiosStore } from './audios-store';
import { defineFirebaseBasicStore } from './firebase-basic-store';
import { useImagesStore } from './images-store';

function convertDataModel(key: string, data: AmbianceData): Ambiance {
  const imagesStore = useImagesStore();
  const audiosStore = useAudiosStore();
  return {
    key: key,
    name: data.name,
    background: data.background
      ? {
          source: imagesStore.get(data.background.source),
        }
      : null,
    music: data.music
      ? {
          source: audiosStore.get(data.music.source),
          volume: data.music.volume,
        }
      : null,
    sounds: data.sounds.map((soundData) => {
      return {
        source: audiosStore.get(soundData.source),
        volume: soundData.volume,
      };
    }),
  };
}

function convertToDataModel(model: Ambiance): AmbianceData {
  return {
    name: model.name,
    background: {
      source: model.background?.source.key || '',
    },
    music: {
      source: model.music?.source.key || '',
      volume: model.music?.volume || 1,
    },
    sounds: model.sounds.map((sound) => {
      return {
        source: sound.source.key || '',
        volume: sound.volume || 1,
      };
    }),
  };
}

export const useAmbiancesStore = defineFirebaseBasicStore<
  AmbianceData,
  Ambiance
>('ambiances', convertDataModel, convertToDataModel);
