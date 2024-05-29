import { AudioSourceData } from '../models/databaseModels';
import { AudioSource } from '../models/viewModels';
import { defineFirebaseBasicStore } from './firebase-basic-store';

function convertDataModel(key: string, data: AudioSourceData): AudioSource {
  return {
    key: key,
    name: data.name,
    url: data.url,
    volume: data.volume,
  };
}

function convertToDataModel(model: AudioSource): AudioSourceData {
  return {
    name: model.name,
    url: model.url,
    volume: model.volume,
  };
}

export const useAudiosStore = defineFirebaseBasicStore<
  AudioSourceData,
  AudioSource
>('audios', convertDataModel, convertToDataModel);
