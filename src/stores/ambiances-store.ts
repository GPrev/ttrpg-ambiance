import { AmbianceData } from '../models/databaseModels';
import { Ambiance } from '../models/viewModels';
import { defineFirebaseBasicStore } from './firebase-basic-store';
import { useImagesStore } from './images-store';

function convertDataModel(key: string, data: AmbianceData): Ambiance {
  const imagesStore = useImagesStore();
  return {
    key: key,
    name: data.name,
    background: {
      source: imagesStore.get(data.background.source),
    },
    music: null,
    sounds: [],
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
    sounds: [],
  };
}

export const useAmbiancesStore = defineFirebaseBasicStore<
  AmbianceData,
  Ambiance
>('ambiances', convertDataModel, convertToDataModel);
