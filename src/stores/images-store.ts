import { ImageSourceData } from '../models/databaseModels';
import { ImageSource } from '../models/viewModels';
import { defineFirebaseBasicStore } from './firebase-basic-store';

function convertDataModel(data: ImageSourceData): ImageSource {
  return {
    name: data.name,
    url: data.url,
  };
}

function convertToDataModel(model: ImageSource): ImageSourceData {
  return {
    name: model.name,
    url: model.url,
  };
}

export const useImagesStore = defineFirebaseBasicStore<
  ImageSourceData,
  ImageSource
>('images', convertDataModel, convertToDataModel);
